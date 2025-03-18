interface ObjectOrIf {
  key?: any
  condition: boolean | (() => boolean)
  message?: string
}

/** use function when you need to lazy evaluate the expression */
type OrIfParams = Array<boolean | (() => boolean) | ObjectOrIf>

export function orSome<T = void>(
  conditions: OrIfParams,
  run: (
    p: {
      /** if you pass a boolean arry, key will be index */
      key: any
    } & Omit<ObjectOrIf, "condition" | "key">,
  ) => T,
): T | void {
  const formattedConditions = conditions.map((item, index) => {
    if (["boolean", "function"].includes(typeof item)) {
      return {
        key: index,
        condition: typeof item === "function" ? item : () => item,
      }
    }
    return {
      ...(item as ObjectOrIf),
      key: (item as ObjectOrIf).key ?? index,
      condition: () => (item as ObjectOrIf).condition,
    }
  })
  if (!Array.isArray(formattedConditions)) {
    throw new Error("conditions must be an array")
  }
  let theIndex = null
  formattedConditions.some((item, index) => {
    if (item.condition()) {
      theIndex = index
      return true
    }
    return false
  })

  if (typeof theIndex === "number") {
    const item = formattedConditions[theIndex]
    // @ts-ignore
    delete item.condition

    return run(item)
  }
}
