import * as documentTools from "./documents/index.js";
import * as collectionTools from "./collections/index.js";

const toolHandlers = new Map([
  ...Object.values(documentTools).map((value) => [value.toolSchema.name, value.handler]),
  ...Object.values(collectionTools).map((value) => [value.toolSchema.name, value.handler]),
]);

export { toolHandlers };
