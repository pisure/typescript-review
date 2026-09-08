import {Customer} from "./crm/domain/model/customer.js";
import {Currency} from "./shared/domain/model/currency.js";
import {Money} from "./shared/domain/model/money.js";
import {SalesOrder} from "./sales/domain/model/sales-order.js";
import {CustomerId} from "./sales/domain/model/customer-id.js";
import {ProductId} from "./sales/domain/model/product-id.js";

const customer = new Customer("John Doe");
const usdCurrency = new Currency("USD");
const realTimeOrder = new SalesOrder(new CustomerId(customer.id.id), usdCurrency);
realTimeOrder.addItem(new ProductId(), 2, new Money(100, usdCurrency));
realTimeOrder.addItem(new ProductId(), 20, new Money(50, usdCurrency));
realTimeOrder.confirm();
customer.recordLastOrderPrice(realTimeOrder.calculateTotalAmount());
console.log(`Real-time order ${realTimeOrder.id} - Customer: ${customer.name} (${customer.id.id}), Ordered at: ${realTimeOrder.getFormattedOrderedAt()}, State: ${realTimeOrder.state}, Items: ${realTimeOrder.items.length}, Total: ${customer.lastOrderPrice?.format()}`);
const penCurrency = new Currency("PEN");
const manualOrder = new SalesOrder(new CustomerId(customer.id.id), penCurrency, "2023-05-15T10:30:00Z");
manualOrder.addItem(new ProductId(), 1, new Money(150, penCurrency));
manualOrder.confirm();
manualOrder.ship();
customer.recordLastOrderPrice(manualOrder.calculateTotalAmount());
console.log(`Manual order ${manualOrder.id} - Customer: ${customer.name} (${customer.id.id}), Ordered at: ${manualOrder.getFormattedOrderedAt()}, State: ${manualOrder.state}, Items: ${manualOrder.items.length}, Total: ${customer.lastOrderPrice?.format("es-PE")}`);
try {
    manualOrder.cancel();
} catch (error) {
    console.error(`Error: ${(error as Error).message}`);
}

try {
    manualOrder.confirm();
} catch (error) {
    console.error(`Error: ${(error as Error).message}`);
}
