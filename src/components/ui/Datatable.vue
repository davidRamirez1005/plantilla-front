<template>
  <div class="datatable-container">
    <!-- Barra de herramientas superior -->
    <div v-if="showToolbar" class="datatable-toolbar">
      <!-- Filtro global -->
      <div v-if="showGlobalFilter" class="global-filter">
        <el-input
          v-model="globalFilterText"
          :placeholder="globalFilterPlaceholder"
          :prefix-icon="Search"
          clearable
          @input="handleGlobalFilter"
        />
      </div>

      <!-- Slot para acciones personalizadas -->
      <div class="toolbar-actions">
        <slot name="toolbar-actions"></slot>
      </div>
    </div>

    <!-- Tabla -->
    <el-table
      ref="tableRef"
      :data="filteredData"
      :row-key="rowKey"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
      @current-change="handleCurrentChange"
      @header-dragend="handleHeaderDragend"
      @expand-change="handleExpandChange"
    >
      <!-- Columna de selección múltiple -->
      <el-table-column
        v-if="showSelection"
        type="selection"
        :width="selectionWidth"
        :fixed="selectionFixed"
        :selectable="selectable"
        :reserve-selection="reserveSelection"
      />

      <!-- Columna de expansión -->
      <el-table-column v-if="showExpand" type="expand" :width="expandWidth" :fixed="expandFixed">
        <template #default="scope">
          <slot name="expand" :row="scope.row" :$index="scope.$index"></slot>
        </template>
      </el-table-column>

      <!-- Columna de índice -->
      <el-table-column
        v-if="showIndex"
        type="index"
        :label="indexLabel"
        :width="indexWidth"
        :fixed="indexFixed"
        :index="indexMethod"
      />

      <!-- Columnas dinámicas -->
      <template v-for="column in columns" :key="column.prop || column.key">
        <el-table-column
          v-if="!column.hidden"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :sortable="
            column.sortable !== false && !column.isAction ? column.sortable || 'custom' : false
          "
          :sort-method="column.sortMethod"
          :sort-by="column.sortBy"
          :sort-orders="column.sortOrders || ['ascending', 'descending', null]"
          :resizable="column.resizable !== false"
          :formatter="column.formatter"
          :show-overflow-tooltip="column.showOverflowTooltip !== false"
          :align="column.align || 'left'"
          :header-align="column.headerAlign || column.align || 'left'"
          :class-name="column.className"
          :label-class-name="column.labelClassName"
          :filters="!column.isAction && column.filters"
          :filter-method="!column.isAction && column.filterMethod"
          :filtered-value="column.filteredValue"
          :filter-placement="column.filterPlacement"
          :filter-multiple="column.filterMultiple !== false"
        >
          <!-- Header personalizado -->
          <template v-if="column.headerSlot" #header="scope">
            <slot :name="`header-${column.prop}`" :column="scope.column" :$index="scope.$index">
              {{ column.label }}
            </slot>
          </template>

          <!-- Filtro por columna -->
          <template v-if="column.showColumnFilter && !column.isAction" #header="scope">
            <div class="column-filter-header">
              <span class="column-label">{{ column.label }}</span>
              <el-input
                v-model="columnFilters[column.prop]"
                :placeholder="`${filterByColumnPlaceholder} ${column.label}`"
                size="small"
                clearable
                @input="handleColumnFilter"
                @click.stop
              />
            </div>
          </template>

          <!-- Contenido de la celda -->
          <template #default="scope">
            <slot
              :name="column.slot || column.prop"
              :row="scope.row"
              :column="column"
              :$index="scope.$index"
            >
              {{ getCellValue(scope.row, column.prop) }}
            </slot>
          </template>
        </el-table-column>
      </template>

      <!-- Slot para columnas personalizadas adicionales -->
      <slot name="custom-columns"></slot>

      <!-- Template vacío -->
      <template #empty>
        <slot name="empty">
          <el-empty :description="emptyText" />
        </slot>
      </template>

      <!-- Template para append -->
      <template v-if="$slots.append" #append>
        <slot name="append"></slot>
      </template>
    </el-table>

    <!-- Paginación -->
    <div v-if="showPagination" class="datatable-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="currentPageSize"
        :page-sizes="pageSizes"
        :layout="paginationLayout"
        :total="total"
        :background="paginationBackground"
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue"
import { Search } from "@element-plus/icons-vue"

// Props
const props = defineProps({
  // Datos
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
  },
  rowKey: {
    type: [String, Function],
    default: "id",
  },

  // Dimensiones
  height: {
    type: [String, Number],
    default: undefined,
  },
  maxHeight: {
    type: [String, Number],
    default: undefined,
  },

  // Estilos
  stripe: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["large", "default", "small"].includes(value),
  },
  fit: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
  currentRowKey: {
    type: [String, Number],
    default: undefined,
  },

  // Expansión
  showExpand: {
    type: Boolean,
    default: false,
  },
  expandWidth: {
    type: [String, Number],
    default: 50,
  },
  expandFixed: {
    type: [String, Boolean],
    default: false,
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  expandRowKeys: {
    type: Array,
    default: () => [],
  },

  // Selección múltiple
  showSelection: {
    type: Boolean,
    default: false,
  },
  selectionWidth: {
    type: [String, Number],
    default: 55,
  },
  selectionFixed: {
    type: [String, Boolean],
    default: false,
  },
  selectable: {
    type: Function,
    default: undefined,
  },
  reserveSelection: {
    type: Boolean,
    default: false,
  },
  selectOnIndeterminate: {
    type: Boolean,
    default: true,
  },

  // Índice
  showIndex: {
    type: Boolean,
    default: false,
  },
  indexLabel: {
    type: String,
    default: "#",
  },
  indexWidth: {
    type: [String, Number],
    default: 55,
  },
  indexFixed: {
    type: [String, Boolean],
    default: false,
  },
  indexMethod: {
    type: Function,
    default: undefined,
  },

  // Ordenamiento
  defaultSort: {
    type: Object,
    default: () => ({}),
  },

  // Tooltip
  tooltipEffect: {
    type: String,
    default: "dark",
    validator: (value) => ["dark", "light"].includes(value),
  },

  // Resumen
  showSummary: {
    type: Boolean,
    default: false,
  },
  sumText: {
    type: String,
    default: "Total",
  },
  summaryMethod: {
    type: Function,
    default: undefined,
  },

  // Span method
  spanMethod: {
    type: Function,
    default: undefined,
  },

  // Tree (estructura de árbol)
  lazy: {
    type: Boolean,
    default: false,
  },
  load: {
    type: Function,
    default: undefined,
  },
  treeProps: {
    type: Object,
    default: () => ({ hasChildren: "hasChildren", children: "children" }),
  },
  indent: {
    type: Number,
    default: 16,
  },

  // Clases y estilos personalizados
  headerCellClassName: {
    type: [String, Function],
    default: undefined,
  },
  headerCellStyle: {
    type: [Object, Function],
    default: undefined,
  },
  headerRowClassName: {
    type: [String, Function],
    default: undefined,
  },
  headerRowStyle: {
    type: [Object, Function],
    default: undefined,
  },
  rowClassName: {
    type: [String, Function],
    default: undefined,
  },
  rowStyle: {
    type: [Object, Function],
    default: undefined,
  },
  cellClassName: {
    type: [String, Function],
    default: undefined,
  },
  cellStyle: {
    type: [Object, Function],
    default: undefined,
  },

  // Filtros
  showGlobalFilter: {
    type: Boolean,
    default: false,
  },
  globalFilterPlaceholder: {
    type: String,
    default: "Buscar...",
  },
  globalFilterFields: {
    type: Array,
    default: () => [],
  },
  showColumnFilter: {
    type: Boolean,
    default: false,
  },
  filterByColumnPlaceholder: {
    type: String,
    default: "",
  },

  // Toolbar
  showToolbar: {
    type: Boolean,
    default: true,
  },

  // Paginación
  showPagination: {
    type: Boolean,
    default: false,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array,
    default: () => [5, 10, 20, 50, 100],
  },
  paginationLayout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  total: {
    type: Number,
    default: 0,
  },
  paginationBackground: {
    type: Boolean,
    default: true,
  },
  paginationSmall: {
    type: Boolean,
    default: false,
  },

  // Texto vacío
  emptyText: {
    type: String,
    default: "No hay datos",
  },
})

// Emits
const emit = defineEmits([
  "select",
  "select-all",
  "selection-change",
  "cell-mouse-enter",
  "cell-mouse-leave",
  "cell-click",
  "cell-dblclick",
  "row-click",
  "row-contextmenu",
  "row-dblclick",
  "header-click",
  "header-contextmenu",
  "sort-change",
  "filter-change",
  "current-change",
  "header-dragend",
  "expand-change",
  "size-change",
  "current-page-change",
  "update:pageSize",
  "update:currentPage",
])

// Referencias
const tableRef = ref(null)

// Estado
const globalFilterText = ref("")
const columnFilters = ref({})
const currentPage = ref(1)
const currentPageSize = ref(props.pageSize)

// Computed
const filteredData = computed(() => {
  let result = [...props.data]

  // Aplicar filtro global (excluir columnas de acción)
  if (globalFilterText.value && props.showGlobalFilter) {
    const searchText = globalFilterText.value.toLowerCase()
    result = result.filter((row) => {
      // Obtener campos para filtrar
      const fields = props.globalFilterFields.length
        ? props.globalFilterFields
        : props.columns.filter((col) => col.prop && !col.isAction).map((col) => col.prop)

      return fields.some((field) => {
        const value = getCellValue(row, field)
        return value && String(value).toLowerCase().includes(searchText)
      })
    })
  }

  // Aplicar filtros por columna (excluir columnas de acción)
  Object.keys(columnFilters.value).forEach((prop) => {
    const filterValue = columnFilters.value[prop]
    if (filterValue) {
      const column = props.columns.find((col) => col.prop === prop)
      if (column && !column.isAction) {
        result = result.filter((row) => {
          const cellValue = getCellValue(row, prop)
          return cellValue && String(cellValue).toLowerCase().includes(filterValue.toLowerCase())
        })
      }
    }
  })

  return result
})

// Métodos
const getCellValue = (row, prop) => {
  if (!prop) return ""
  return prop.split(".").reduce((obj, key) => obj?.[key], row)
}

const handleGlobalFilter = () => {
  // El computed se encarga del filtrado
}

const handleColumnFilter = () => {
  // El computed se encarga del filtrado
}

// Eventos de la tabla
const handleSelect = (selection, row) => {
  emit("select", selection, row)
}

const handleSelectAll = (selection) => {
  emit("select-all", selection)
}

const handleSelectionChange = (selection) => {
  emit("selection-change", selection)
}

const handleCellMouseEnter = (row, column, cell, event) => {
  emit("cell-mouse-enter", row, column, cell, event)
}

const handleCellMouseLeave = (row, column, cell, event) => {
  emit("cell-mouse-leave", row, column, cell, event)
}

const handleCellClick = (row, column, cell, event) => {
  emit("cell-click", row, column, cell, event)
}

const handleCellDblclick = (row, column, cell, event) => {
  emit("cell-dblclick", row, column, cell, event)
}

const handleRowClick = (row, column, event) => {
  emit("row-click", row, column, event)
}

const handleRowContextmenu = (row, column, event) => {
  emit("row-contextmenu", row, column, event)
}

const handleRowDblclick = (row, column, event) => {
  emit("row-dblclick", row, column, event)
}

const handleHeaderClick = (column, event) => {
  emit("header-click", column, event)
}

const handleHeaderContextmenu = (column, event) => {
  emit("header-contextmenu", column, event)
}

const handleSortChange = ({ column, prop, order }) => {
  emit("sort-change", { column, prop, order })
}

const handleFilterChange = (filters) => {
  emit("filter-change", filters)
}

const handleCurrentChange = (currentRow, oldCurrentRow) => {
  emit("current-change", currentRow, oldCurrentRow)
}

const handleHeaderDragend = (newWidth, oldWidth, column, event) => {
  emit("header-dragend", newWidth, oldWidth, column, event)
}

const handleExpandChange = (row, expandedRows) => {
  emit("expand-change", row, expandedRows)
}

// Eventos de paginación
const handleSizeChange = (val) => {
  currentPageSize.value = val
  emit("update:pageSize", val)
  emit("size-change", val)
}

const handleCurrentPageChange = (val) => {
  currentPage.value = val
  emit("update:currentPage", val)
  emit("current-page-change", val)
}

// Métodos públicos expuestos
const clearSelection = () => {
  tableRef.value?.clearSelection()
}

const toggleRowSelection = (row, selected) => {
  tableRef.value?.toggleRowSelection(row, selected)
}

const toggleAllSelection = () => {
  tableRef.value?.toggleAllSelection()
}

const toggleRowExpansion = (row, expanded) => {
  tableRef.value?.toggleRowExpansion(row, expanded)
}

const setCurrentRow = (row) => {
  tableRef.value?.setCurrentRow(row)
}

const clearSort = () => {
  tableRef.value?.clearSort()
}

const clearFilter = (columnKeys) => {
  tableRef.value?.clearFilter(columnKeys)
}

const doLayout = () => {
  tableRef.value?.doLayout()
}

const sort = (prop, order) => {
  tableRef.value?.sort(prop, order)
}

const scrollTo = (options, yCoord) => {
  tableRef.value?.scrollTo(options, yCoord)
}

const setScrollTop = (top) => {
  tableRef.value?.setScrollTop(top)
}

const setScrollLeft = (left) => {
  tableRef.value?.setScrollLeft(left)
}

// Watchers
watch(
  () => props.pageSize,
  (val) => {
    currentPageSize.value = val
  }
)

watch(
  () => props.columns,
  (newColumns) => {
    // Inicializar filtros de columna para columnas que tienen showColumnFilter
    newColumns.forEach((col) => {
      if (col.showColumnFilter && col.prop && !columnFilters.value[col.prop]) {
        columnFilters.value[col.prop] = ""
      }
    })
  },
  { immediate: true }
)

// Exponer métodos y referencias
defineExpose({
  tableRef,
  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort,
  scrollTo,
  setScrollTop,
  setScrollLeft,
  currentPage,
  currentPageSize,
  globalFilterText,
  columnFilters,
})
</script>

<style scoped>
.datatable-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.datatable-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.global-filter {
  flex: 1;
  max-width: 400px;
  min-width: 200px;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.column-filter-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.column-label {
  font-weight: 500;
  font-size: 14px;
  color: var(--el-text-color-primary);
}

.datatable-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* Responsive */
@media (max-width: 768px) {
  .datatable-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .global-filter {
    max-width: 100%;
  }

  .toolbar-actions {
    justify-content: space-between;
  }

  .datatable-pagination {
    justify-content: center;
  }
}
</style>
