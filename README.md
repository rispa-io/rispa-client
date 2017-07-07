# Rispa Client [![Build Status](https://api.travis-ci.org/rispa-io/rispa-client.svg?branch=master)](https://travis-ci.org/rispa-io/rispa-client)

**Rispa** plugin for Client-Side render React app, provide `redux` store, routing and cookies.

* [User Guide](https://github.com/rispa-io/rispa-core) – How to develop apps bootstrapped with **Rispa**.

## Configuration
You can configure some of Rispa Client behavior using environment variables.

### Offline mode
If you need to disable Offline mode, you can specify `DISABLE_OFFLINE` to `true`

Mac and Linux:
```bash
DISABLE_OFFLINE=true
```

Windows:
```bash
set DISABLE_OFFLINE=true
```

### React dev tools
If you need to disable React dev-tools, you can specify `DISABLE_REACT_DEVTOOLS` to `true`

Mac and Linux:
```bash
DISABLE_REACT_DEVTOOLS=true
```

Windows:
```bash
set DISABLE_REACT_DEVTOOLS=true
```

### Redux dev tools
If you need to disable Redux dev-tools, you can specify `DISABLE_REDUX_DEVTOOLS` to `true`

Mac and Linux:
```bash
DISABLE_REDUX_DEVTOOLS=true
```

Windows:
```bash
set DISABLE_REDUX_DEVTOOLS=true
```
