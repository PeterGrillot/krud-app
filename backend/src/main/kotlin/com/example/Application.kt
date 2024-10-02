package com.example

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.routing.registerCustomerRoutes
import io.ktor.serialization.jackson.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.http.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        install(ContentNegotiation) {
            jackson()
        }
        install(CORS) {
            host("localhost:3000")
            header(HttpHeaders.ContentType)
            method(HttpMethod.Options)
            method(HttpMethod.Put)
            method(HttpMethod.Patch)
            method(HttpMethod.Delete)
        }
        registerCustomerRoutes()
    }.start(wait = true)
}