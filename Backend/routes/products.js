const { productsServices } = require("../services");
process.env.SECRET_KEY = "secret";
const jwt = require("jsonwebtoken");

module.exports = [
  {
    method: "GET",
    path: "/products",
    handler: async (request, handler) => {
      if (request.headers["authorization"]) {
        const check = await jwt.verify(
          request.headers["authorization"],
          process.env.SECRET_KEY
        );
        if (check !== undefined) {
          return productsServices.getAll(request.query);
        }
      } else {
        return { status: "failed", message: "authorization required " };
      }
    },
  },
  {
    method: "GET",
    path: "/products/{id}",
    handler: async (request, handler) => {
      if (request.headers["authorization"]) {
        const check = await jwt.verify(
          request.headers["authorization"],
          process.env.SECRET_KEY
        );
        if (check !== undefined) {
          return productsServices.getById(request.params.id);
        }
      } else {
        return { status: "failed", message: "authorization required " };
      }
    },
  },
  {
    method: "POST",
    path: "/products",
    handler: async (request, handler) => {
      if (request.headers["authorization"]) {
        const check = await jwt.verify(
          request.headers["authorization"],
          process.env.SECRET_KEY
        );
        if (check !== undefined) {
          return productsServices.create(request.payload);
        }
      } else {
        return { status: "failed", message: "authorization required " };
      }
    },
  },
  {
    method: "PATCH",
    path: "/products/{id}",
    handler: async (request, handler) => {
      if (request.headers["authorization"]) {
        const check = await jwt.verify(
          request.headers["authorization"],
          process.env.SECRET_KEY
        );
        if (check !== undefined) {
          return productsServices.update(request.params.id, request.payload);
        }
      } else {
        return { status: "failed", message: "authorization required " };
      }
    },
  },
  {
    method: "DELETE",
    path: "/products/{id}",
    handler: async (request, handler) => {
      if (request.headers["authorization"]) {
        const check = await jwt.verify(
          request.headers["authorization"],
          process.env.SECRET_KEY
        );
        if (check !== undefined) {
          return productsServices.delete(request.params.id);
        }
      } else {
        return { status: "failed", message: "authorization required " };
      }
    },
  },
];
