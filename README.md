## Sample to show `ConnectorError` `cached plan must not change result type` in Prisma.

### How to reproduce:
1. Clone the repository.
2. Run `npm install`.
3. Go to './_postgres' directory and run `docker-compose up -d` (docker engine must be installed).
4. Run `npm run migrate`.
5. Run `npm run deploy`.
6. Run `npm run dev`.
7. Run `npm test` a few times (5+ at least) one instantly after another -> the Error occurs.

Error messages (may differ from time to time, but have similar structure and origin I reckon):
```
console.error src/tests/utils/ErrorLog.ts:5
  Exception: {
    clientVersion: '2.25.0',
    stacktrace: [
      'Error: ',
      'Invalid `prisma.user.create()` invocation:',
      '',
      '',
      '  Error occurred during query execution:',
      'ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(Error { kind: Db, cause: Some(DbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState("XX000"), message: "cache lookup failed for type 29778", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("lsyscache.c"), line: Some(2672), routine: Some("getTypeBinaryInputInfo") }) }) })',
      '    at cb (/Users/jackiejo/main/CSB/api/node_modules/@prisma/client/runtime/index.js:33820:17)',
      '    at processTicksAndRejections (internal/process/task_queues.js:93:5)'
    ]
  }
```

```
graphQLErrors: [
  {
    message: '\n' +
      'Invalid `prisma.user.findUnique()` invocation:\n' +
      '\n' +
      '\n' +
      '  Error occurred during query execution:\n' +
      'ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(Error { kind: Db, cause: Some(DbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState("0A000"), message: "cached plan must not change result type", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("plancache.c"), line: Some(722), routine: Some("RevalidateCachedQuery") }) }) })',
    locations: [Array],
    path: [Array],
    extensions: [Object]
  }
],
```