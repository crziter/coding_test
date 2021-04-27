import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { CardInfo } from "../../types";

type Step2Props = {
  onSubmit: () => void;
};

function handlePayment(cardInfo: CardInfo) {
  return new Promise((accept, reject) => {
    setTimeout(() => { 
      accept(true);
    }, 2000);
  })
};

export default function Step2(props: Step2Props) {
  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      month: 1,
      year: 2021,
      cvv: '',
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(15, "Mininum 15 characters")
        .required("Required!"),
      month: Yup.number()
        .min(1)
        .max(12)
        .required("Required!"),
      year: Yup.number()
        .min(2021)
        .max(2025)
        .required("Required!"),
      cvv: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(3, "Minimum 3 character")
        .required("Required!")
    }),
    onSubmit: values => {
      setTimeout(() => {
        handlePayment(values).then(() => {
          props.onSubmit();
        })
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="cardNumber">Card Number</label>
        <input id="cardNumber" name="cardNumber" type="text" onChange={ formik.handleChange } value={ formik.values.cardNumber } />
        { formik.errors.cardNumber && formik.touched.cardNumber && (<p>{formik.errors.cardNumber}</p>) }
      </div>

      <div>
        <label htmlFor="month">Expire Month</label>
        <input id="month" name="month" type="number" onChange={ formik.handleChange } value={formik.values.month} />
        { formik.errors.month && formik.touched.month && (<p>{formik.errors.month}</p>) }
      </div>

      <div>
        <label htmlFor="year">Expire Year</label>
        <input id="year" name="year" type="number" onChange={ formik.handleChange } value={formik.values.year} />
        { formik.errors.year && formik.touched.year && (<p>{formik.errors.year}</p>) }
      </div>

      <div>
        <label htmlFor="cvv">CVV</label>
        <input id="cvv" name="cvv" type="text" onChange={ formik.handleChange } value={formik.values.cvv} />
        { formik.errors.cvv && formik.touched.cvv && (<p>{formik.errors.cvv}</p>) }
      </div>

      <button type="submit">Next</button>
     </form>
  );
}