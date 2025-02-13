import { useState } from "react";

const handleOnChange = (e, formData, setFormData) => {
  const { name, value, files, type } = e.target;

  setFormData({
    ...formData,
    [name]: value,
    // image: type === "file" ? files?.[0] : formData.image,
  });
};

const useForm = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);

  return {
    handleOnChange: (e) => handleOnChange(e, formData, setFormData),
    setFormData,
    formData,
  };
};

export default useForm;
