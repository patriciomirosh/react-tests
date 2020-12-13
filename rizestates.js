const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);





/*Recapitulemos qué pasa cuando editamos una entrada:

React llama a la función especificada como onChange en el <input> del DOM. En nuestro caso es el método handleChange en el componente TemperatureInput.
El método handleChange en el componente TemperatureInput llama a this.props.onTemperatureChange() con el nuevo valor. Sus propiedades, incluyendo onTemperatureChange, fueron provistas para el componente padre Calculator.
Cuando renderizó previamente, Calculator especificó que onTemperatureChange del componente TemperatureInput con la escala Celsius es el método handleCelsiusChange y onTemperatureChange del componente TemperatureInput con escala Fahrenheit es el método handleFahrenheitChange. Entonces, cada uno de estos métodos es llamado dependiendo del componente que se edite.
Dentro de estos métodos, el componente Calculator pregunta a React para volver a renderizar a sí mismo llamando al método this.setState() con el nuevo valor y la escala actual de la entrada que acabamos de editar.
React llama al método render del componente Calculator para saber cómo debe lucir la interfaz de usuario. Los valores de ambas entradas son recalculados en base a la temperatura actual y la escala activa. La conversión de temperatura es hecha aquí.
React llama a los métodos render de los componentes TemperatureInput de manera individual con sus nuevas propiedades especificadas por Calculator. Aprende como sus interfaces de usuario deberían verse.
React llama al método render del componente BoilingVerdict, pasando la temperatura en Celsius como una propiedad.
React DOM actualiza el DOM con el componente BoilingVerdict y sincroniza los valores deseados para las entradas. La entrada que acabamos de actualizar recibe su valor actual, y la otra entrada es actualizada a su temperatura luego de hacer la conversión.
Toda actualización sigue los mismos pasos y las entradas se mantienen sincronizadas. */

