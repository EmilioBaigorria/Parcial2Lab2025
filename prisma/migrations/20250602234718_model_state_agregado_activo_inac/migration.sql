/*
  Warnings:

  - You are about to drop the column `estado` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ModelState" AS ENUM ('ACTIVO', 'INACTIVO');

-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Descuento" ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "DetalleOrden" ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Direccion" ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "OrdenCompra" ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "PedidoItem" ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Talle" ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "estado",
ADD COLUMN     "estadoM" "ModelState" NOT NULL DEFAULT 'ACTIVO';

-- DropEnum
DROP TYPE "UserState";
