export const formatCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatDateRequest = (date: string) => {
  const arrayOfDate = date.split('-');
  return `${arrayOfDate[2]}-${arrayOfDate[1]}-${arrayOfDate[0]}`;
};

export const formatDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
