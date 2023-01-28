/**
 * Get the number of default stigma slots allowed for selected characters lvl
 * @returns number of allowed slots
 */
export const getNumberDefaultSlotsAllowed = (lvl: number) => {
  const stigma_lvls = [20, 20, 30, 40, 50, 55];

  return stigma_lvls.filter((stigma_lvl) => lvl >= stigma_lvl).length;
};

/**
 * Get the number of advanced stigma slots allowed for selected characters lvl
 * @returns number of allowed slots
 */
export const getNumberAdvancedSlotsAllowed = (lvl: number) => {
  const stigma_lvls = [45, 45, 50, 52, 55];

  return stigma_lvls.filter((stigma_lvl) => lvl >= stigma_lvl).length;
};
