#here the list of endpoints that will do the basic crud operations.

# How to run the project
# clone the project into your directory.
# Make sure docker installed in the computer.
# docker compose -f `${take the absolute path of your folder}`/docker-compose.yml up -d --build        


order-service (localhost:50052)
```bash
# CreateOrder
grpcurl -plaintext -import-path order-service/proto -proto order.proto \
  -d '{"productId":1,"quantity":3}' localhost:50052 order.OrderService/CreateOrder
# GetOrder
grpcurl -plaintext -import-path order-service/proto -proto order.proto \
  -d '{"id":1}' localhost:50052 order.OrderService/GetOrder
# ListOrders
grpcurl -plaintext -import-path order-service/proto -proto order.proto \
  -d '{}' localhost:50052 order.OrderService/ListOrders
# UpdateOrder
grpcurl -plaintext -import-path order-service/proto -proto order.proto \
  -d '{"id":1,"status":"CONFIRMED"}' localhost:50052 order.OrderService/UpdateOrder
# DeleteOrder
grpcurl -plaintext -import-path order-service/proto -proto order.proto \
  -d '{"id":1}' localhost:50052 order.OrderService/DeleteOrder
```

product-service
# Create Product
grpcurl -plaintext -import-path /Users/incred/Documents/Learning/assignment-app/product-service/proto -proto product.proto \
  -d '{"name":"Pen","price":2.0}' \
  localhost:50051 product.ProductService/CreateProduct
# Get Product
grpcurl -plaintext -import-path /Users/incred/Documents/Learning/assignment-app/product-service/proto -proto product.proto \
  -d '{"id":1}' \
  localhost:50051 product.ProductService/GetProduct
# List Product
grpcurl -plaintext -import-path /Users/incred/Documents/Learning/assignment-app/product-service/proto -proto product.proto \
  -d '{}' \
  localhost:50051 product.ProductService/ListProducts
# Update Product
grpcurl -plaintext -import-path /Users/incred/Documents/Learning/assignment-app/product-service/proto -proto product.proto \
  -d '{"id":1,"name":"Blue Pen","price":2.5}' \
  localhost:50051 product.ProductService/UpdateProduct

Postman (gRPC)
- New → gRPC → URL: `localhost:50051` or `localhost:50052` → TLS off
- Import protos: `product-service/proto/product.proto`, `order-service/proto/order.proto`
- Choose method, send JSON body