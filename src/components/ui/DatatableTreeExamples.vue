<template>
  <div class="tree-examples-page">
    <el-tabs v-model="activeTab" type="border-card">
      <!-- Ejemplo 1: Árbol Simple -->
      <el-tab-pane label="Árbol Simple" name="simple">
        <div class="tab-content">
          <h2>Estructura de Árbol Simple</h2>
          <p class="description">
            Ejemplo de tabla con estructura jerárquica de departamentos y equipos. Todos los datos
            se cargan de una vez.
          </p>

          <Datatable
            :data="treeData"
            :columns="treeColumns"
            row-key="id"
            border
            show-index
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :default-expand-all="false"
            height="500"
          >
            <template #budget="{ row }">
              <el-tag type="success">{{ formatCurrency(row.budget) }}</el-tag>
            </template>

            <template #employees="{ row }">
              <el-badge :value="row.employees" type="primary">
                <el-icon><User /></el-icon>
              </el-badge>
            </template>

            <template #actions="{ row }">
              <el-button size="small" :icon="Edit">Editar</el-button>
              <el-button size="small" type="danger" :icon="Delete">Eliminar</el-button>
            </template>
          </Datatable>
        </div>
      </el-tab-pane>

      <!-- Ejemplo 2: Lazy Loading -->
      <el-tab-pane label="Carga Perezosa" name="lazy">
        <div class="tab-content">
          <h2>Carga Perezosa (Lazy Loading)</h2>
          <p class="description">
            Los datos se cargan bajo demanda al expandir cada nodo. Útil para grandes volúmenes de
            datos jerárquicos.
          </p>

          <el-alert type="info" :closable="false" style="margin-bottom: 20px">
            <template #title> 💡 Expande un nodo para cargar sus hijos dinámicamente </template>
          </el-alert>

          <Datatable
            :data="lazyData"
            :columns="lazyColumns"
            row-key="id"
            border
            stripe
            lazy
            :load="loadLazyChildren"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            height="500"
          >
            <template #type="{ row }">
              <el-tag :type="getNodeType(row.type)">
                {{ row.type }}
              </el-tag>
            </template>

            <template #loading="{ row }">
              <el-icon v-if="row.loading" class="is-loading">
                <Loading />
              </el-icon>
            </template>

            <template #actions="{ row }">
              <el-button size="small" :icon="View">Ver Detalles</el-button>
            </template>
          </Datatable>
        </div>
      </el-tab-pane>

      <!-- Ejemplo 3: Árbol con Selección y Filtros -->
      <el-tab-pane label="Árbol Avanzado" name="advanced">
        <div class="tab-content">
          <h2>Árbol con Selección Múltiple y Filtros</h2>
          <p class="description">
            Combina estructura de árbol con selección múltiple, filtro global y columnas ordenables.
          </p>

          <Datatable
            ref="advancedTableRef"
            :data="advancedTreeData"
            :columns="advancedColumns"
            row-key="id"
            border
            show-selection
            show-global-filter
            global-filter-placeholder="Buscar en la estructura organizacional..."
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            height="500"
            @selection-change="handleAdvancedSelection"
          >
            <template #toolbar-actions>
              <el-button
                type="primary"
                :disabled="selectedAdvanced.length === 0"
                @click="handleBulkAction"
              >
                Acción en Lote ({{ selectedAdvanced.length }})
              </el-button>
              <el-button @click="expandAll">Expandir Todo</el-button>
              <el-button @click="collapseAll">Colapsar Todo</el-button>
            </template>

            <template #status="{ row }">
              <el-tag :type="row.status === 'active' ? 'success' : 'info'" size="small">
                {{ row.status === "active" ? "Activo" : "Inactivo" }}
              </el-tag>
            </template>

            <template #manager="{ row }">
              <div v-if="row.manager" class="manager-cell">
                <el-avatar :size="24" :src="row.manager.avatar">
                  {{ row.manager.name.charAt(0) }}
                </el-avatar>
                <span>{{ row.manager.name }}</span>
              </div>
              <span v-else class="text-secondary">Sin asignar</span>
            </template>

            <template #actions="{ row }">
              <el-dropdown>
                <el-button size="small">
                  Acciones <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :icon="Edit">Editar</el-dropdown-item>
                    <el-dropdown-item :icon="Plus">Agregar Subnodo</el-dropdown-item>
                    <el-dropdown-item :icon="Delete" divided>Eliminar</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </Datatable>
        </div>
      </el-tab-pane>

      <!-- Ejemplo 4: Árbol con Expansión Personalizada -->
      <el-tab-pane label="Con Expansión" name="expand">
        <div class="tab-content">
          <h2>Árbol con Filas Expandibles</h2>
          <p class="description">
            Combina estructura de árbol con filas expandibles para mostrar información detallada.
          </p>

          <Datatable
            :data="expandTreeData"
            :columns="expandColumns"
            row-key="id"
            border
            stripe
            show-expand
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            height="500"
          >
            <template #expand="{ row }">
              <div class="expand-details">
                <el-descriptions :column="2" border size="small">
                  <el-descriptions-item label="ID">
                    {{ row.id }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Código">
                    {{ row.code || "N/A" }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Descripción" :span="2">
                    {{ row.description || "Sin descripción" }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Fecha de Creación">
                    {{ formatDate(row.createdAt) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Última Actualización">
                    {{ formatDate(row.updatedAt) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Ubicación" :span="2">
                    {{ row.location || "No especificada" }}
                  </el-descriptions-item>
                </el-descriptions>

                <div class="metrics" v-if="row.metrics">
                  <h4>Métricas</h4>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-statistic title="Proyectos Activos" :value="row.metrics.projects" />
                    </el-col>
                    <el-col :span="8">
                      <el-statistic title="Tareas Completadas" :value="row.metrics.tasks" />
                    </el-col>
                    <el-col :span="8">
                      <el-statistic title="Eficiencia" :value="row.metrics.efficiency" suffix="%" />
                    </el-col>
                  </el-row>
                </div>
              </div>
            </template>

            <template #progress="{ row }">
              <el-progress
                :percentage="row.progress"
                :status="row.progress === 100 ? 'success' : undefined"
              />
            </template>

            <template #actions="{ row }">
              <el-button-group>
                <el-button size="small" :icon="Edit">Editar</el-button>
                <el-button size="small" :icon="View">Ver</el-button>
                <el-button size="small" type="danger" :icon="Delete">Eliminar</el-button>
              </el-button-group>
            </template>
          </Datatable>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { Edit, Delete, Plus, View, User, Loading, ArrowDown } from "@element-plus/icons-vue"
import Datatable from "@/components/ui/Datatable.vue"

// Estado
const activeTab = ref("simple")
const selectedAdvanced = ref([])
const advancedTableRef = ref(null)

// Datos para árbol simple
const treeData = ref([
  {
    id: 1,
    name: "Departamento de Tecnología",
    budget: 500000,
    employees: 45,
    children: [
      {
        id: 11,
        name: "Equipo de Desarrollo Frontend",
        budget: 200000,
        employees: 15,
        children: [
          {
            id: 111,
            name: "Squad React",
            budget: 100000,
            employees: 7,
          },
          {
            id: 112,
            name: "Squad Vue",
            budget: 100000,
            employees: 8,
          },
        ],
      },
      {
        id: 12,
        name: "Equipo de Desarrollo Backend",
        budget: 200000,
        employees: 18,
        children: [
          {
            id: 121,
            name: "Squad Node.js",
            budget: 100000,
            employees: 9,
          },
          {
            id: 122,
            name: "Squad Python",
            budget: 100000,
            employees: 9,
          },
        ],
      },
      {
        id: 13,
        name: "Equipo de DevOps",
        budget: 100000,
        employees: 12,
      },
    ],
  },
  {
    id: 2,
    name: "Departamento de Marketing",
    budget: 300000,
    employees: 30,
    children: [
      {
        id: 21,
        name: "Equipo de Marketing Digital",
        budget: 150000,
        employees: 15,
      },
      {
        id: 22,
        name: "Equipo de Contenido",
        budget: 150000,
        employees: 15,
      },
    ],
  },
  {
    id: 3,
    name: "Departamento de Ventas",
    budget: 400000,
    employees: 50,
    children: [
      {
        id: 31,
        name: "Ventas Directas",
        budget: 200000,
        employees: 25,
      },
      {
        id: 32,
        name: "Ventas Online",
        budget: 200000,
        employees: 25,
      },
    ],
  },
])

const treeColumns = ref([
  { prop: "name", label: "Nombre", minWidth: 250 },
  { prop: "budget", label: "Presupuesto", width: 150, slot: "budget", sortable: true },
  {
    prop: "employees",
    label: "Empleados",
    width: 120,
    slot: "employees",
    align: "center",
    sortable: true,
  },
  {
    prop: "actions",
    label: "Acciones",
    width: 200,
    fixed: "right",
    isAction: true,
    slot: "actions",
    align: "center",
  },
])

// Datos para lazy loading
const lazyData = ref([
  { id: "1", name: "Región Norte", type: "Region", hasChildren: true },
  { id: "2", name: "Región Sur", type: "Region", hasChildren: true },
  { id: "3", name: "Región Este", type: "Region", hasChildren: true },
  { id: "4", name: "Región Oeste", type: "Region", hasChildren: true },
])

const lazyColumns = ref([
  { prop: "name", label: "Nombre", minWidth: 250 },
  { prop: "type", label: "Tipo", width: 150, slot: "type" },
  {
    prop: "actions",
    label: "Acciones",
    width: 150,
    fixed: "right",
    isAction: true,
    slot: "actions",
    align: "center",
  },
])

// Función para cargar hijos en lazy loading
const loadLazyChildren = (row, treeNode, resolve) => {
  ElMessage.info(`Cargando hijos de: ${row.name}`)

  // Simular carga asíncrona
  setTimeout(() => {
    let children = []

    if (row.type === "Region") {
      // Provincias
      children = [
        {
          id: `${row.id}-1`,
          name: `Provincia 1 de ${row.name}`,
          type: "Provincia",
          hasChildren: true,
        },
        {
          id: `${row.id}-2`,
          name: `Provincia 2 de ${row.name}`,
          type: "Provincia",
          hasChildren: true,
        },
        {
          id: `${row.id}-3`,
          name: `Provincia 3 de ${row.name}`,
          type: "Provincia",
          hasChildren: true,
        },
      ]
    } else if (row.type === "Provincia") {
      // Ciudades
      children = [
        { id: `${row.id}-1`, name: `Ciudad A`, type: "Ciudad", hasChildren: false },
        { id: `${row.id}-2`, name: `Ciudad B`, type: "Ciudad", hasChildren: false },
      ]
    }

    resolve(children)
  }, 1000)
}

const getNodeType = (type) => {
  const types = {
    Region: "danger",
    Provincia: "warning",
    Ciudad: "success",
  }
  return types[type] || "info"
}

// Datos para árbol avanzado
const advancedTreeData = ref([
  {
    id: "org-1",
    name: "Dirección General",
    status: "active",
    manager: { name: "Carlos Director", avatar: "https://i.pravatar.cc/150?img=10" },
    children: [
      {
        id: "org-1-1",
        name: "Gerencia de Operaciones",
        status: "active",
        manager: { name: "Ana Gerente", avatar: "https://i.pravatar.cc/150?img=11" },
        children: [
          {
            id: "org-1-1-1",
            name: "Jefatura de Producción",
            status: "active",
            manager: { name: "Luis Jefe", avatar: "https://i.pravatar.cc/150?img=12" },
          },
          {
            id: "org-1-1-2",
            name: "Jefatura de Calidad",
            status: "active",
            manager: { name: "María Jefa", avatar: "https://i.pravatar.cc/150?img=13" },
          },
        ],
      },
      {
        id: "org-1-2",
        name: "Gerencia de Finanzas",
        status: "active",
        manager: { name: "Pedro Contador", avatar: "https://i.pravatar.cc/150?img=14" },
      },
    ],
  },
])

const advancedColumns = ref([
  { prop: "name", label: "Unidad Organizacional", minWidth: 250, sortable: true },
  { prop: "status", label: "Estado", width: 120, slot: "status", align: "center" },
  { prop: "manager", label: "Responsable", width: 180, slot: "manager" },
  {
    prop: "actions",
    label: "Acciones",
    width: 150,
    fixed: "right",
    isAction: true,
    slot: "actions",
    align: "center",
  },
])

// Datos para árbol con expansión
const expandTreeData = ref([
  {
    id: "proj-1",
    name: "Proyecto Alpha",
    code: "PROJ-001",
    progress: 75,
    description: "Proyecto de desarrollo de nueva plataforma",
    createdAt: "2024-01-15",
    updatedAt: "2024-02-08",
    location: "Oficina Central - Madrid",
    metrics: {
      projects: 5,
      tasks: 42,
      efficiency: 87,
    },
    children: [
      {
        id: "proj-1-1",
        name: "Fase 1: Análisis",
        code: "PROJ-001-F1",
        progress: 100,
        description: "Análisis de requisitos y diseño inicial",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-30",
        location: "Remoto",
        metrics: {
          projects: 1,
          tasks: 15,
          efficiency: 95,
        },
      },
      {
        id: "proj-1-2",
        name: "Fase 2: Desarrollo",
        code: "PROJ-001-F2",
        progress: 60,
        description: "Desarrollo de funcionalidades core",
        createdAt: "2024-02-01",
        updatedAt: "2024-02-08",
        location: "Oficina Central - Madrid",
        metrics: {
          projects: 3,
          tasks: 27,
          efficiency: 82,
        },
      },
    ],
  },
  {
    id: "proj-2",
    name: "Proyecto Beta",
    code: "PROJ-002",
    progress: 30,
    description: "Renovación de infraestructura",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-08",
    location: "Datacenter - Barcelona",
    metrics: {
      projects: 2,
      tasks: 18,
      efficiency: 73,
    },
  },
])

const expandColumns = ref([
  { prop: "name", label: "Nombre del Proyecto", minWidth: 200 },
  { prop: "code", label: "Código", width: 120 },
  { prop: "progress", label: "Progreso", width: 180, slot: "progress" },
  {
    prop: "actions",
    label: "Acciones",
    width: 220,
    fixed: "right",
    isAction: true,
    slot: "actions",
    align: "center",
  },
])

// Métodos
const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const handleAdvancedSelection = (selection) => {
  selectedAdvanced.value = selection
}

const handleBulkAction = () => {
  ElMessage.success(`Acción aplicada a ${selectedAdvanced.value.length} nodos`)
}

const expandAll = () => {
  ElMessage.info("Expandiendo todos los nodos...")
  // Nota: Esta funcionalidad requiere implementación adicional en el componente
}

const collapseAll = () => {
  ElMessage.info("Colapsando todos los nodos...")
  // Nota: Esta funcionalidad requiere implementación adicional en el componente
}
</script>

<style scoped>
.tree-examples-page {
  padding: 0;
}

.tab-content {
  padding: 20px;
}

.tab-content h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0 0 8px 0;
}

.description {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin: 0 0 24px 0;
  line-height: 1.6;
}

.manager-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.text-secondary {
  color: var(--el-text-color-secondary);
  font-style: italic;
}

.expand-details {
  padding: 20px;
  background-color: var(--el-fill-color-light);
}

.expand-details .metrics {
  margin-top: 20px;
}

.expand-details .metrics h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
}

:deep(.el-tabs__content) {
  padding: 0;
}
</style>
