$body = @{
    "level" = "error"
    "message" = "Failed to connect to DB"
    "resourceId" = "server-1234"
    "timestamp" = "2023-09-15T08:00:00Z"
    "traceId" = "abc-xyz-123"
    "spanId" = "span-456"
    "commit" = "5e5342f"
    "metadata" = @{
        "parentResourceId" = "server-0987"
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/ingest -Method POST -Body $body -ContentType "application/json"