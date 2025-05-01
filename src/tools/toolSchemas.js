import * as documentTools from "./documents/index.js";
import * as collectionTools from "./collections/index.js";

const toolSchemas = [
    ...Object.values(documentTools).map((tool) => tool.toolSchema),
    ...Object.values(collectionTools).map((tool) => tool.toolSchema),
]

export { toolSchemas };
