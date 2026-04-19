# Security Specification for Villaverde FM

## Data Invariants
1. A ChatMessage must have a `senderId` matching the authenticated user's UID.
2. A ChatMessage `createdAt` must be the request time (server timestamp).
3. ChatMessages are immutable; they can be created but not updated or deleted by users.
4. User profiles can only be written by the owner (UID match).
5. All users must have a verified email to write in the chat.

## The Dirty Dozen (Attacker Payloads)
1. **Identity Spoofing**: Send message with `senderId: 'victim_uid'`.
2. **Shadow Field Injection**: Create message with `isAdmin: true`.
3. **Ghost Update**: Update an existing message to change its text.
4. **Mass Deletion**: Attempt to delete all messages in the collection.
5. **PII Leak**: Attempt to read private user info of another user.
6. **Time Travel**: Set `createdAt` to a future date manually.
7. **Junk ID Poisoning**: Create document with a 1MB string as ID.
8. **Resource Exhaustion**: Send message with `text` field size > 100KB.
9. **Unauthenticated Write**: Send message without a valid auth token.
10. **Unverified Email Write**: Write to chat with `email_verified: false`.
11. **Cross-User Profile Edit**: Update someone else's public profile.
12. **Insecure Path Variables**: Inject script tags into `userId` path variable.
