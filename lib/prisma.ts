import { PrismaClient } from "@prisma/client"

// PrismaClient es el cliente que nos permite interactuar con la base de datos
// Cada vez que importemos 'prisma', vamos a usar esta misma instancia

// globalForPrisma sirve para almacenar la instancia de Prisma en el scope global
// Esto evita que se creen múltiples instancias cuando Next.js recarga el proyecto en desarrollo
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Creamos la instancia de Prisma si no existe aún
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ["query"], // Esta opción hace que Prisma imprima las consultas SQL en la consola (útil para aprender y depurar)
})

// Guardamos la instancia en globalForPrisma si estamos en desarrollo
// Así evitamos problemas de "Too many clients" cuando hacemos hot reload
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
