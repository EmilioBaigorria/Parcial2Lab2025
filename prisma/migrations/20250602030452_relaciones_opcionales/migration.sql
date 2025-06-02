-- DropForeignKey
ALTER TABLE "DetalleOrden" DROP CONSTRAINT "DetalleOrden_ordenCompraId_fkey";

-- DropForeignKey
ALTER TABLE "OrdenCompra" DROP CONSTRAINT "OrdenCompra_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoItem" DROP CONSTRAINT "PedidoItem_pedidoId_fkey";

-- AlterTable
ALTER TABLE "DetalleOrden" ALTER COLUMN "ordenCompraId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrdenCompra" ALTER COLUMN "pedidoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PedidoItem" ALTER COLUMN "pedidoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DetalleOrden" ADD CONSTRAINT "DetalleOrden_ordenCompraId_fkey" FOREIGN KEY ("ordenCompraId") REFERENCES "OrdenCompra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenCompra" ADD CONSTRAINT "OrdenCompra_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItem" ADD CONSTRAINT "PedidoItem_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;
