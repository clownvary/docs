# ANET Release DEV Rollback Strategy

> Based on current single-tenant DB and deployment strucuture release DB rollback for ANET is very difficult. So ANET uses following rules to make sure DB is not rollback if a deployment is needed to.  


+ In general we try to avoid making DB changes that won’t be backwards compatible if a code rollback is required. See document "Rules for AN DB changes to avoid rollback.docx".

+ There is a rollback KM that developers and DBE are responsible for updating if they make changes that can’t be made backwards compatible. For instance a change to a stored procedure or function.
