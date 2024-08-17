// Yaml Config
declare module '*.yaml' {
  // This is marked as unknown because when we import from the yaml we do not know any of the type information.
  const value: unknown;
  export default value;
}
