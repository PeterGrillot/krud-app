package com.example.models
import org.litote.kmongo.*
import kotlinx.serialization.*
import java.util.*

@Serializable
data class Customer(
    @Contextual val key: Id<Customer> = newId(),
    var id: String = "",
    val firstName: String,
    val lastName: String,
    val email: String,
    @Contextual var joinDate: String = ""
    )
