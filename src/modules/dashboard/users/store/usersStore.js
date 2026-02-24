import { defineStore } from "pinia"
import { ref, computed } from "vue"

const initialUsers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+34 600 123 456",
    role: "Admin",
    department: "Tecnología",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=1",
    address: "Calle Principal 123, Madrid",
    createdAt: "2024-01-15",
    lastActivity: "2024-02-08",
  },
  {
    id: 2,
    name: "María García",
    email: "maria.garcia@example.com",
    phone: "+34 600 234 567",
    role: "Editor",
    department: "Marketing",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=2",
    address: "Avenida Central 456, Barcelona",
    createdAt: "2024-01-20",
    lastActivity: "2024-02-07",
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos.lopez@example.com",
    phone: "+34 600 345 678",
    role: "Usuario",
    department: "Ventas",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=3",
    address: "Plaza Mayor 789, Valencia",
    createdAt: "2024-02-01",
    lastActivity: "2024-02-06",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    phone: "+34 600 456 789",
    role: "Editor",
    department: "Diseño",
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?img=4",
    address: "Calle Nueva 321, Sevilla",
    createdAt: "2024-02-05",
    lastActivity: "2024-02-05",
  },
  {
    id: 5,
    name: "Pedro Sánchez",
    email: "pedro.sanchez@example.com",
    phone: "+34 600 567 890",
    role: "Usuario",
    department: "Operaciones",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=5",
    address: "Paseo Marítimo 654, Málaga",
    createdAt: "2024-01-10",
    lastActivity: "2024-02-08",
  },
  {
    id: 6,
    name: "Laura Fernández",
    email: "laura.fernandez@example.com",
    phone: "+34 600 678 901",
    role: "Admin",
    department: "Recursos Humanos",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=6",
    address: "Calle Sol 987, Bilbao",
    createdAt: "2024-01-25",
    lastActivity: "2024-02-08",
  },
  {
    id: 7,
    name: "Miguel Ruiz",
    email: "miguel.ruiz@example.com",
    phone: "+34 600 789 012",
    role: "Invitado",
    department: "Externo",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=7",
    address: "Plaza España 147, Zaragoza",
    createdAt: "2024-02-03",
    lastActivity: "2024-02-07",
  },
  {
    id: 8,
    name: "Isabel Torres",
    email: "isabel.torres@example.com",
    phone: "+34 600 890 123",
    role: "Editor",
    department: "Contenido",
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?img=8",
    address: "Avenida Libertad 258, Murcia",
    createdAt: "2024-01-18",
    lastActivity: "2024-01-30",
  },
]

export const useUsersStore = defineStore("users", () => {
  const users = ref([...initialUsers])

  const totalUsers = computed(() => users.value.length)
  const activeUsers = computed(() => users.value.filter((u) => u.status === "active"))
  const inactiveUsers = computed(() => users.value.filter((u) => u.status === "inactive"))

  const addUser = (user) => {
    const newId = users.value.length > 0 ? Math.max(...users.value.map((u) => u.id)) + 1 : 1
    const newUser = {
      ...user,
      id: newId,
      avatar: user.avatar || `https://i.pravatar.cc/150?img=${newId}`,
      address: user.address || "Sin dirección",
      createdAt: new Date().toLocaleDateString("en-CA"),
      lastActivity: new Date().toLocaleDateString("en-CA"),
    }
    users.value.push(newUser)
    return newUser
  }

  const updateUser = (updatedUser) => {
    const index = users.value.findIndex((user) => user.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        ...updatedUser,
        lastActivity: new Date().toLocaleDateString("en-CA"),
      }
      return true
    }
    return false
  }

  const deleteUser = (userId) => {
    const index = users.value.findIndex((user) => user.id === userId)
    if (index !== -1) {
      users.value.splice(index, 1)
      return true
    }
    return false
  }

  const deleteMultipleUsers = (userIds) => {
    users.value = users.value.filter((user) => !userIds.includes(user.id))
  }

  const getUserById = (userId) => {
    return users.value.find((user) => user.id === userId)
  }

  return {
    users,
    totalUsers,
    activeUsers,
    inactiveUsers,
    addUser,
    updateUser,
    deleteUser,
    deleteMultipleUsers,
    getUserById,
  }
})
