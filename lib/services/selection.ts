export const selectedServiceStorageKey = "mehndiconnect:selected-service";

export function saveSelectedService(
  serviceId: string,
  storage: Pick<Storage, "setItem">,
): void {
  storage.setItem(selectedServiceStorageKey, serviceId);
}

export function getSelectedServiceId(
  storage: Pick<Storage, "getItem">,
): string | null {
  return storage.getItem(selectedServiceStorageKey);
}
