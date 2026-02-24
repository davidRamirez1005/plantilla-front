<template>
  <div class="users-page">
    <el-card>
      <div class="page-header">
        <h1>Gestión de Usuarios</h1>
        <p class="page-description">Administra los usuarios del sistema</p>
      </div>
      <Datatable
        ref="datatableRef"
        :data="tableData"
        :columns="columns"
        row-key="id"
        stripe
        border
        show-selection
        show-expand
        show-global-filter
        global-filter-placeholder="Buscar usuarios..."
        :global-filter-fields="['name', 'email', 'role']"
        show-pagination
        :total="totalRecords"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        height="600"
        highlight-current-row
        :default-sort="{ prop: 'id', order: 'ascending' }"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        @sort-change="handleSortChange"
        @current-page-change="handleCurrentPageChange"
        @size-change="handleSizeChange"
      >
        <!-- Acciones en toolbar -->
        <template #toolbar-actions>
          <el-button type="primary" :icon="Plus" @click="handleAddUser"> Nuevo Usuario </el-button>
          <el-button :icon="Delete" :disabled="selectedRows.length === 0" @click="handleBulkDelete">
            Eliminar Seleccionados ({{ selectedRows.length }})
          </el-button>
          <!-- <el-button :icon="Refresh" @click="refreshData"> Actualizar </el-button> -->
        </template>

        <!-- Contenido expandible -->
        <template #expand="{ row }">
          <div class="expand-content">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="ID">
                {{ row.id }}
              </el-descriptions-item>
              <el-descriptions-item label="Nombre Completo">
                {{ row.name }}
              </el-descriptions-item>
              <el-descriptions-item label="Email">
                {{ row.email }}
              </el-descriptions-item>
              <el-descriptions-item label="Teléfono">
                {{ row.phone }}
              </el-descriptions-item>
              <el-descriptions-item label="Rol">
                {{ row.role }}
              </el-descriptions-item>
              <el-descriptions-item label="Departamento">
                {{ row.department }}
              </el-descriptions-item>
              <el-descriptions-item label="Fecha de Registro" :span="2">
                {{ formatDate(row.createdAt) }}
              </el-descriptions-item>
              <el-descriptions-item label="Última Actividad" :span="2">
                {{ formatDate(row.lastActivity) }}
              </el-descriptions-item>
              <el-descriptions-item label="Dirección" :span="2">
                {{ row.address }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </template>

        <!-- Columna de avatar -->
        <template #avatar="{ row }">
          <el-avatar :size="40" :src="row.avatar">
            {{ row.name?.charAt(0) || "?" }}
          </el-avatar>
        </template>

        <!-- Columna de estado -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)" size="small">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>

        <!-- Columna de rol -->
        <template #role="{ row }">
          <el-tag :type="getRoleType(row.role)" effect="plain" size="small">
            {{ row.role }}
          </el-tag>
        </template>

        <!-- Columna de acciones -->
        <template #actions="{ row }">
          <el-button size="small" type="primary" :icon="Edit" @click="handleEdit(row)">
            Editar
          </el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="handleDelete(row)">
            Eliminar
          </el-button>
        </template>

        <!-- Contenido vacío -->
        <template #empty>
          <el-empty description="No hay usuarios registrados">
            <el-button type="primary" @click="handleAddUser"> Agregar primer usuario </el-button>
          </el-empty>
        </template>
      </Datatable>
    </el-card>

    <!-- Drawer para agregar/editar usuario -->
    <DrawerCustom
      v-model="drawerVisible"
      :title="isEditing ? 'Editar Usuario' : 'Agregar Usuario'"
      size="500px"
      cancel-text="Cancelar"
      confirm-text="Guardar"
      @confirm="handleSave"
    >
      <el-form :model="userForm" label-width="120px" label-position="top">
        <el-form-item label="Nombre">
          <el-input v-model="userForm.name" placeholder="Ingrese el nombre" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="userForm.email" placeholder="Ingrese el email" />
        </el-form-item>
        <el-form-item label="Teléfono">
          <el-input v-model="userForm.phone" placeholder="Ingrese el teléfono" />
        </el-form-item>
        <el-form-item label="Rol">
          <el-select v-model="userForm.role" placeholder="Seleccionar rol" style="width: 100%">
            <el-option label="Admin" value="Admin" />
            <el-option label="Editor" value="Editor" />
            <el-option label="Usuario" value="Usuario" />
            <el-option label="Invitado" value="Invitado" />
          </el-select>
        </el-form-item>
        <el-form-item label="Departamento">
          <el-input v-model="userForm.department" placeholder="Ingrese el departamento" />
        </el-form-item>
        <el-form-item label="Dirección">
          <el-input v-model="userForm.address" placeholder="Ingrese la dirección" />
        </el-form-item>
        <el-form-item label="Estado">
          <el-switch
            v-model="userForm.status"
            active-value="active"
            inactive-value="inactive"
            active-text="Activo"
            inactive-text="Inactivo"
          />
        </el-form-item>
      </el-form>
    </DrawerCustom>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Plus, Edit, Delete, Refresh } from "@element-plus/icons-vue"
import Datatable from "@/components/ui/Datatable.vue"
import DrawerCustom from "@/components/ui/DrawerCustom.vue"
import { formatDate } from "@/services/composable"
import { useUsersStore } from "../store/usersStore"

const usersStore = useUsersStore()
const datatableRef = ref(null)
const selectedRows = ref([])
const drawerVisible = ref(false)
const isEditing = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)

const userForm = ref({
  name: "",
  email: "",
  phone: "",
  role: "Usuario",
  department: "",
  address: "",
  status: "active",
})

const columns = ref([
  {
    prop: "id",
    label: "#",
    width: 80,
    align: "center",
    sortable: true,
  },
  {
    prop: "avatar",
    label: "Avatar",
    width: 80,
    slot: "avatar",
    align: "center",
    sortable: false,
  },
  {
    prop: "name",
    label: "Nombre",
    minWidth: 150,
    showColumnFilter: true,
    sortable: true,
  },
  {
    prop: "email",
    label: "Email",
    minWidth: 200,
    showColumnFilter: true,
    sortable: true,
  },
  {
    prop: "role",
    label: "Rol",
    width: 120,
    slot: "role",
    showColumnFilter: true,
    sortable: true,
  },
  {
    prop: "department",
    label: "Departamento",
    width: 150,
    showColumnFilter: true,
    sortable: true,
  },
  {
    prop: "status",
    label: "Estado",
    width: 100,
    slot: "status",
    align: "center",
    showColumnFilter: true,
    sortable: true,
  },
  {
    prop: "actions",
    label: "Acciones",
    width: 200,
    isAction: true, // Excluir de filtros
    slot: "actions",
    align: "center",
  },
])

const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return usersStore.users.slice(start, end)
})

const totalRecords = computed(() => usersStore.users.length)

const getStatusType = (status) => {
  if (!status) return "info"
  return status === "active" ? "success" : "danger"
}

const getStatusText = (status) => {
  if (!status) return "Sin estado"
  return status === "active" ? "Activo" : "Inactivo"
}

const getRoleType = (role) => {
  if (!role) return "info"
  const types = {
    Admin: "danger",
    Editor: "warning",
    Usuario: "primary",
    Invitado: "info",
  }
  return types[role] || "info"
}

// Handlers de eventos
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
  console.log("Usuarios seleccionados:", selection)
}

const handleRowClick = (row) => {
  console.log("Fila clickeada:", row)
}

const handleSortChange = ({ prop, order }) => {
  console.log("Ordenar por:", prop, "Orden:", order)
}

const handleCurrentPageChange = (page) => {
  currentPage.value = page
}

const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleAddUser = () => {
  isEditing.value = false
  userForm.value = {
    name: "",
    email: "",
    phone: "",
    role: "Usuario",
    department: "",
    address: "",
    status: "active",
  }
  drawerVisible.value = true
}

const handleEdit = (row) => {
  isEditing.value = true
  userForm.value = { ...row }
  drawerVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `¿Estás seguro de eliminar al usuario "${row.name}"?`,
    "Confirmar eliminación",
    {
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      type: "warning",
    }
  )
    .then(() => {
      if (usersStore.deleteUser(row.id)) {
        ElMessage.success("Usuario eliminado correctamente")
      }
    })
    .catch(() => {
      ElMessage.info("Eliminación cancelada")
    })
}

const handleBulkDelete = () => {
  ElMessageBox.confirm(
    `¿Estás seguro de eliminar ${selectedRows.value.length} usuario(s)?`,
    "Confirmar eliminación múltiple",
    {
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      type: "warning",
    }
  )
    .then(() => {
      const idsToDelete = selectedRows.value.map((row) => row.id)
      usersStore.deleteMultipleUsers(idsToDelete)
      datatableRef.value?.clearSelection()
      ElMessage.success(`${idsToDelete.length} usuario(s) eliminado(s) correctamente`)
    })
    .catch(() => {
      ElMessage.info("Eliminación cancelada")
    })
}

const handleSave = () => {
  if (isEditing.value) {
    if (usersStore.updateUser(userForm.value)) {
      ElMessage.success("Usuario actualizado correctamente")
    }
  } else {
    usersStore.addUser(userForm.value)
    ElMessage.success("Usuario agregado correctamente")
  }
  drawerVisible.value = false
}

const refreshData = () => {
  ElMessage.success("Datos actualizados")
}
</script>

<style scoped>
.users-page {
  padding: 0;
}
</style>
