package com.example.routing

import org.litote.kmongo.*
import com.example.models.Customer
import com.mongodb.client.MongoDatabase
import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import java.util.*
import kotlin.collections.ArrayList

val client = KMongo.createClient()
val database: MongoDatabase = client.getDatabase("test")
val collection = database.getCollection<Customer>("customer")

fun Route.customerRouting() {
    route("/customer") {
        // Get all Customers
        get {
            call.respond(collection.find().into(ArrayList()))
        }
        // Get one Customer by ID
        get("{_id}") {
            val id = call.parameters["_id"] ?: return@get call.respondText(
                "Missing or malformed id.",
                status = HttpStatusCode.BadRequest
            )
            val customer =
                collection.findOne(Customer::id eq id) ?: return@get call.respondText(
                    "No customer with id $id.",
                    status = HttpStatusCode.NotFound
                )
            call.respond(customer)
        }
        // Create new Customer
        post {
            val customer = call.receive<Customer>()
            customer.id = customer.key.toString()
            customer.joinDate = Date().toString()
            println(customer.joinDate)
            collection.insertOne(customer) ?: return@post call.respondText(
                "Failed to update.",
                status = HttpStatusCode.BadRequest
            )
            call.respondText("Customer stored correctly.", status = HttpStatusCode.Created)
        }
        // Update Customer
        patch {
            val customer = call.receive<Customer>()
            // Quick and Dirty, not optimal as you need to pass around
            // val from client to server
            collection.findOneAndReplace(Customer::id eq customer.id, customer ) ?: return@patch call.respondText(
                "No customer with id $customer.id.",
                status = HttpStatusCode.NotFound
            )
            call.respondText("Customer updated.", status = HttpStatusCode.OK)
        }
        // Delete Customer
        delete("{_id}") {
            val id = call.parameters["_id"]
            collection.findOneAndDelete(Customer::id eq id) ?: return@delete call.respondText(
                    "No customer with id $id",
                    status = HttpStatusCode.NotFound
                )
            call.respondText("Customer removed.", status = HttpStatusCode.OK)
        }
    }
}

fun Application.registerCustomerRoutes() {
    routing {
        customerRouting()
    }
}