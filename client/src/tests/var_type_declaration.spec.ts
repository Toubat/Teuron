import { describe, it, expect } from "vitest";
import type { VarTypeDecleration } from "../openai/var_types";
import { VarType, createVarTypeDeclerationString } from "../openai/var_types";

describe("createVarTypeDeclerationString", () => {
  it("number type", () => {
    const typeNode: VarTypeDecleration<VarType.Number> = {
      type: VarType.Number,
      inner: VarType.Number,
    };

    const result = createVarTypeDeclerationString(typeNode);
    expect(result).toBe("number");
  });

  it("boolean type", () => {
    const typeNode: VarTypeDecleration<VarType.Boolean> = {
      type: VarType.Boolean,
      inner: VarType.Boolean,
    };

    const result = createVarTypeDeclerationString(typeNode);
    expect(result).toBe("boolean");
  });

  it("string type", () => {
    const typeNode: VarTypeDecleration<VarType.String> = {
      type: VarType.String,
      inner: VarType.String,
    };

    const result = createVarTypeDeclerationString(typeNode);
    expect(result).toBe("string");
  });

  it("simple array type", () => {
    const typeNode: VarTypeDecleration<VarType.Array> = {
      type: VarType.Array,
      inner: {
        type: VarType.String,
        inner: VarType.String,
      },
    };

    const result = createVarTypeDeclerationString(typeNode);
    expect(result).toBe("string[]");
  });

  it("simple object type", () => {
    const typeNode: VarTypeDecleration<VarType.Object> = {
      type: VarType.Object,
      inner: {
        a: {
          type: VarType.String,
          inner: VarType.String,
        },
        b: {
          type: VarType.Number,
          inner: VarType.Number,
        },
      },
    };

    const result = createVarTypeDeclerationString(typeNode);
    expect(result).toMatchSnapshot();
  });

  it("array of simple object", () => {
    const arrayOfObject: VarTypeDecleration<VarType.Array> = {
      type: VarType.Array,
      inner: {
        type: VarType.Object,
        inner: {
          a: {
            type: VarType.String,
            inner: VarType.String,
          },
          b: {
            type: VarType.Number,
            inner: VarType.Number,
          },
        },
      },
    };

    const result = createVarTypeDeclerationString(arrayOfObject);
    expect(result).toMatchSnapshot();
  });

  it("object of array of simple object", () => {
    const arrayOfObject: VarTypeDecleration<VarType.Array> = {
      type: VarType.Array,
      inner: {
        type: VarType.Object,
        inner: {
          a: {
            type: VarType.String,
            inner: VarType.String,
          },
          b: {
            type: VarType.Number,
            inner: VarType.Number,
          },
        },
      },
    };

    const objectOfArrayOfObject: VarTypeDecleration<VarType.Object> = {
      type: VarType.Object,
      inner: {
        a: {
          type: VarType.Number,
          inner: VarType.Number,
        },
        b: arrayOfObject,
      },
    };

    const result = createVarTypeDeclerationString(objectOfArrayOfObject);
    expect(result).toMatchSnapshot();
  });

  it("array of object of array of simple object", () => {
    const arrayOfObject: VarTypeDecleration<VarType.Array> = {
      type: VarType.Array,
      inner: {
        type: VarType.Object,
        inner: {
          a: {
            type: VarType.String,
            inner: VarType.String,
          },
          b: {
            type: VarType.Number,
            inner: VarType.Number,
          },
        },
      },
    };

    const objectOfArrayOfObject: VarTypeDecleration<VarType.Object> = {
      type: VarType.Object,
      inner: {
        a: {
          type: VarType.Number,
          inner: VarType.Number,
        },
        b: arrayOfObject,
      },
    };

    const arrayOfObjectOfArrayOfObject: VarTypeDecleration<VarType.Array> = {
      type: VarType.Array,
      inner: objectOfArrayOfObject,
    };

    const result = createVarTypeDeclerationString(arrayOfObjectOfArrayOfObject);
    expect(result).toMatchSnapshot();
  });

  it("complex object", () => {
    const complexObject: VarTypeDecleration<VarType.Object> = {
      type: VarType.Object,
      inner: {
        a: {
          type: VarType.String,
          inner: VarType.String,
        },
        b: {
          type: VarType.Number,
          inner: VarType.Number,
        },
        c: {
          type: VarType.Boolean,
          inner: VarType.Boolean,
        },
        d: {
          type: VarType.Array,
          inner: {
            type: VarType.String,
            inner: VarType.String,
          },
        },
        e: {
          type: VarType.Array,
          inner: {
            type: VarType.Number,
            inner: VarType.Number,
          },
        },
        f: {
          type: VarType.Array,
          inner: {
            type: VarType.Boolean,
            inner: VarType.Boolean,
          },
        },
        g: {
          type: VarType.Array,
          inner: {
            type: VarType.Object,
            inner: {
              a: {
                type: VarType.String,
                inner: VarType.String,
              },
              b: {
                type: VarType.Number,
                inner: VarType.Number,
              },
              c: {
                type: VarType.Array,
                inner: {
                  type: VarType.Object,
                  inner: {
                    a: {
                      type: VarType.String,
                      inner: VarType.String,
                    },
                    b: {
                      type: VarType.Number,
                      inner: VarType.Number,
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const result = createVarTypeDeclerationString(complexObject);
    expect(result).toMatchSnapshot();
  });

  it("complex nested object & array", () => {
    const complexObject: VarTypeDecleration<VarType.Object> = {
      type: VarType.Object,
      inner: {
        arr: {
          type: VarType.Array,
          inner: {
            type: VarType.Object,
            inner: {
              a: {
                type: VarType.String,
                inner: VarType.String,
              },
              b: {
                type: VarType.Array,
                inner: {
                  type: VarType.Object,
                  inner: {
                    a: {
                      type: VarType.Object,
                      inner: {
                        a: {
                          type: VarType.Object,
                          inner: {
                            a: {
                              type: VarType.Number,
                              inner: VarType.Number,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const result = createVarTypeDeclerationString(complexObject);
    expect(result).toMatchSnapshot();
  });
});
