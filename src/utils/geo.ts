export const detectCountry = async (): Promise<string | undefined> => {
  try {
    const res = await fetch("https://ipapi.co/country/");    
    return (await res.text()).trim().toUpperCase();
  } catch {
    return undefined;
  }
};
