// Type definitions for [LIBRARY NAME]
// Project: [LIBRARY URL]
// Definitions by: [AUTHOR NAME] <[AUTHOR URL]>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'cerebral-provider-firebase' {
  interface TemplateFunction<T> {
    ( context: any ) : { value: T, target: string }
  }
  type StringTemplate = string | TemplateFunction<string>
  interface CerebralProviderFirebase {
    onChildAdded 
    ( remotePath: StringTemplate
    , signalPath: string
    , options?: any
    ) : any
    onChildChanged
    ( remotePath: StringTemplate
    , signalPath: string
    , options?: any
    ) : any
    onChildRemoved
    ( remotePath: StringTemplate
    , signalPath: string
    , options?: any
    ) : any
    value ( any ): any
    remove ( any ): any
    delete
    ( remoteFolder: StringTemplate
    , remoteFilename: StringTemplate
    ) : any
    put
    ( remotePath: StringTemplate
    , file: any
    , options: any
    ) : any
    set
    ( remotePath: StringTemplate
    , value: any
    )
  }
  const module: CerebralProviderFirebase
  export = module
}