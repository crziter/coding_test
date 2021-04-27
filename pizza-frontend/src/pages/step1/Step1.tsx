import { useState } from "react";
import { PizzaOptions } from "../../types";

type Step1Props = {
  onSubmit: (options: PizzaOptions)=>void;
};

export default function Step1(props: Step1Props) {
  const [ flavor, setFlavor ] = useState<string>("seafood");

  const flavors = [
    "seafood",
    "peperoni",
    "mushroom"
  ];

  const onNext = () => {
    props.onSubmit({ flavor });
  };

  return (
    <>
      <div><strong>Pizza Options</strong></div>
      <div>
        <div>Flavor</div>
        <div>
          <select value={ flavor } onChange={ (e)=> { setFlavor(e.target.value) } }>
            {
              flavors.map((item, index) => (<option key={ index } value={ item }>{ item }</option>))
            }
          </select>
        </div>
      </div>
      <button onClick={ onNext }>Next</button>
    </>
  );
}