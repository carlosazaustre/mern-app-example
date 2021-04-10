import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export function SubmitForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmitting(false);
    console.log(data);
    axios.post("http://localhost:4000/voiceet", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Voiceet</h1>
      <label htmlFor="user">Username: </label>
      <input
        id="user"
        name="user"
        type="text"
        {...register("user", { required: "Please, enter a username" })}
      />
      {errors?.user?.message && <p>{errors.user.message}</p>}

      <label htmlFor="audio">Your message: </label>
      <input
        id="audio"
        name="audio"
        type="text"
        {...register("audio", { required: "Please, enter a message" })}
      />
      {errors?.user?.message && <p>{errors.user.message}</p>}

      <button type="submit" disabled={submitting}>
        Send!
      </button>
    </form>
  );
}
