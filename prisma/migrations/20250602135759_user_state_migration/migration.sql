-- CreateEnum
CREATE TYPE "UserState" AS ENUM ('ACTIVO', 'INACTIVO');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "estado" "UserState" NOT NULL DEFAULT 'ACTIVO';
