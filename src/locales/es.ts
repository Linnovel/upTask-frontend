//Mapeo - Traduccion de valores - Value Mapping
export const statusTrasnlations: { [key: string]: string } = {
  pending: "Pendiente",
  onHold: "En Espera",
  inProgress: "En Progreso",
  underReview: "En Revision",
  completed: "Completado",
}

export const statusColors: { [key: string]: string } = {
  pending: "border-t-slate-600",
  onHold: "border-t-red-200",
  inProgress: "border-t-blue-600",
  underReview: "border-t-amber-600",
  completed: "border-t-emerald-600",
}
