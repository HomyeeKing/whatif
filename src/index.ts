interface ObjectOrIf {
  key?: any
  condition: boolean
  message?: string
}

type OrIfParams = Array<boolean | ObjectOrIf>

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
    if (typeof item === "boolean") {
      return {
        key: index,
        condition: item,
      }
    }
    return { ...item, key: item.key ?? index }
  })
  if (!Array.isArray(formattedConditions)) {
    throw new Error("conditions must be an array")
  }
  let theIndex = null
  formattedConditions.some((item, index) => {
    if (item.condition) {
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
