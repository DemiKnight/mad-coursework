export function mapErrors<Err>(
  error: Err,
  actionName?: string,
  resourceName?: string,
): Array<string> {
  // todo This
  console.log(`${error} ${actionName} ${resourceName}`);
  return ['x'];
}
