import React, {useContext} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {CartContext} from './ShoppingCart';
import CardCart from './CardCart';
import { useDispatch } from 'react-redux';
import { SET_PRICE } from '../../redux/actions';

const ListCart = ({navigation}) => {
  const dispatch = useDispatch();
  const {cartItems, resetCart, addItemToCart, deleteItemToCart} =
    useContext(CartContext);

    const precios = cartItems.map(e => e.product.price * e.quantity)
    const total = precios.reduce((prev, curr) => prev + curr)
    
    const onPress = () => {
      dispatch({type: SET_PRICE, payload: total})
      navigation.navigate('Pay')
    }

  function navegar(product) {
    navigation.navigate('DetailProduct', product);
  }
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1.2}}>
        <Button title="Reset" onPress={resetCart} />
        <Text>Carrito de Compras: {cartItems?.length} </Text>
      </View>
      <View style={{backgroundColor: 'black', flex: 10}}>
        {!!cartItems?.length && (
          <FlatList
            data={cartItems}
            renderItem={({item}) => (
              <CardCart navegar={navegar} productInCart={item} />
            )}
          />
        )}
      </View>
      <View style={{flex: 0.8}}>
        <Button color="green" title={`Pay Now $${total} USD`} onPress={onPress} />
      </View>
    </View>
  );
};
export default ListCart;
