import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import i18n from "i18next";
import { Colors } from "../theme";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemeContext, ThemeType } from "../theme/ThemeContext";

type CalculatorProps = {
  handleCalculatorView: (result: string) => void;
  convertValue: (value: number) => void;
  hideCalculator: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ handleCalculatorView, convertValue, hideCalculator }) => {
  const [result, setResult] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [ignoreCalc, setIgnoreCalc] = useState<boolean>(false);
  const handleNumberPress = (number: string) => {
    const result = input + number;
    handleCalculatorView(result);
    setInput(result);
  };

  const handleOperatorPress = (operator: string) => {
    const result = input + ` ${operator} `
      handleCalculatorView(result);
    setInput(result);
  };

  const handleBackspacePress = () => {
    const result = input.slice(0, -1)
    setInput(result);
    handleCalculatorView(result);

  };

  const handleClearPress = () => {
 //   setIgnoreCalc(true);
 //   setResult(0);
    handleCalculatorView('0');
    setInput('');

//    convertValue(0);
  };

  React.useEffect(() => {
    if(ignoreCalc) {
      setIgnoreCalc(false);
      return;
    }
      calculate();
  }, [input]);

  const calculate = async () => {
    const expression = input.trim();
    const tokens = expression.split(' ');

    let currentOperator = '+';
    let currentNumber = 0;
    for (const token of tokens) {
      if (['+', '-', '×', '÷'].includes(token)) {
        currentOperator = token;
      } else {
        const number = parseFloat(token);

        switch (currentOperator) {
          case '+':
            currentNumber += number;
            break;
          case '-':
            currentNumber -= number;
            break;
          case '×':
            currentNumber *= number;
            break;
          case '÷':
            currentNumber /= number;
            break;
        }
      }
    }

    setResult(currentNumber);
    convertValue(currentNumber);
  }

  const { theme } = useContext<ThemeType>(ThemeContext);

  const styles = StyleSheet.create(
  {
      container: {
        flex: 0.8,
        flexDirection: 'column',
        gap:4,
        width: "100%",

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        backgroundColor: Colors[theme].common,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      },
      row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap:4,
      },
      button: {
        flex: 1,
        backgroundColor: Colors[theme].common,
        borderWidth: 1,
        borderColor: Colors[theme]?.hardDarkCommon,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      buttonText: {
        fontSize: 30,
        color: Colors[theme].white
      },
      buttonWide: {
        paddingHorizontal:3,
        flex: 2,
      },
      operatorButton: {
        backgroundColor: Colors[theme].primary,
      },
    operatorButtonText:{
      color: Colors[theme].commonWhite
    },
    clearButton: {

      backgroundColor: Colors[theme].primarySoft,
    },
    clearButtonText:{

        color:  Colors[theme].primary,
    }
    })



  const handleEqualPress = () => {

    calculate().then(() => {
        setIgnoreCalc(true);
        handleCalculatorView(result.toString());
        setInput(result.toString())
      }
    );
  };



  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.buttonWide, styles.clearButton]} onPress={() => handleClearPress()}>
          <Text style={[styles.buttonText, styles.clearButtonText]}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={() => handleBackspacePress()}>
          <FontAwesome5 name="backspace" size={20} color={Colors[theme].primary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorPress('÷')}>
          <Text style={[styles.buttonText, styles.operatorButtonText]}>÷</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorPress('×')}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={[styles.button, styles.operatorButton]}  onPress={() => handleOperatorPress('-')}>
            <Text  style={[styles.buttonText, styles.operatorButtonText]}>−</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={[styles.button, styles.operatorButton]}  onPress={() => handleOperatorPress('+')}>
            <Text  style={[styles.buttonText, styles.operatorButtonText]}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => hideCalculator()}>
            <MaterialIcons name="keyboard-hide" size={24} color={Colors[theme].disabled} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]}  onPress={() => handleEqualPress()}>
            <Text  style={[styles.buttonText, styles.operatorButtonText]}>=</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};


export default Calculator;
