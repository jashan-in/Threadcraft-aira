ALTER TABLE "Order"
ADD COLUMN "checkoutKey" TEXT,
ADD COLUMN "razorpayOrderId" TEXT;

UPDATE "Order"
SET "checkoutKey" = 'legacy-' || "id"
WHERE "checkoutKey" IS NULL;

ALTER TABLE "Order"
ALTER COLUMN "checkoutKey" SET NOT NULL;

CREATE UNIQUE INDEX "Order_checkoutKey_key"
ON "Order"("checkoutKey");

CREATE UNIQUE INDEX "Order_razorpayOrderId_key"
ON "Order"("razorpayOrderId");