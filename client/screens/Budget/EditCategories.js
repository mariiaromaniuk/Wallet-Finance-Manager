import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchBudget, setBudget } from '../../store/budget';
import Slider from 'react-native-slider';


class EditCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      remaining: 0
    };
    this.toTitle = this.toTitle.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchBudget(this.props.user.id);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.budget && props.budget.foodAndDrink !== state.categories.name) {
      return {
        categories: [
          {
            name: 'foodAndDrink',
            percentage: props.budget.foodAndDrink,
            description: '(Groceries, restaurants, bars, nightlife, etc.)'
          },
          {
            name: 'travel',
            percentage: props.budget.travel,
            description: '(Gas, subway, train, bus, etc.)'
          },
          {
            name: 'recreation',
            percentage: props.budget.recreation,
            description: '(Arts and entertainment, sports, outdoors, etc.)'
          },
          {
            name: 'healthcare',
            percentage: props.budget.healthcare,
            description: '(Doctor visits, prescriptions, physicians, etc.)'
          },
          {
            name: 'service',
            percentage: props.budget.service,
            description: '(Self-care, automotive, financial, home repair, etc.)'
          },
          {
            name: 'community',
            percentage: props.budget.community,
            description: '(Education, donations, offering, etc.)'
          },
          {
            name: 'shops',
            percentage: props.budget.shops,
            description: '(Presents, clothes, accessories, etc.)'
          }
        ],
        remaining:
          100 -
          props.budget.foodAndDrink -
          props.budget.travel -
          props.budget.recreation -
          props.budget.healthcare -
          props.budget.service -
          props.budget.community -
          props.budget.shops
      };
    } else {
      return null;
    }
  }

  toTitle(str, separator) {
    separator = typeof separator === 'undefined' ? ' ' : separator;
    return str
      .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
      .replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }

  render() {
    return (
      <ScrollView>
        <View>
          {this.props.budget.id && (
            <View>
              <View>
                <Text>
                  Edit Your Budget
                </Text>
                <View>
                  <Text>
                    {this.state.remaining}%
                  </Text>
                  <Text>
                    ${(this.props.budget.spendingBudget *
                      this.state.remaining) /
                      100}
                  </Text>
                </View>

                <View>
                  <Text>
                    remaining of ${this.props.budget.spendingBudget}
                  </Text>
                </View>
              </View>
              <View/>
              {this.state.categories &&
                this.state.categories.map(category => {
                  return (
                    <Card>
                      <View>
                        <View/>
                        <View>
                          <Text>
                            {this.toTitle(category.name)}
                          </Text>

                          <Text>
                            {category.percentage}%
                          </Text>
                        </View>

                        <Slider
                          maximumTrackTintColor="#b7b7b7"
                          value={category.percentage}
                          onSlidingComplete={value => {
                            this.setState(prevState => {
                              const remaining =
                                prevState.remaining +
                                (category.percentage - value);
                              return {
                                categories: [...prevState.categories].map(
                                  elem => {
                                    if (elem.name === category.name) {
                                      elem.percentage = value;
                                      return elem;
                                    } else {
                                      return elem;
                                    }
                                  }
                                ),
                                remaining: remaining
                              };
                            });
                          }}
                          step={5}
                          minimumValue={0}
                          maximumValue={100}
                        />
                      </View>
                    </Card>
                  );
                })}

              <Button
                raised
                disabled={this.state.remaining >= 0 ? false : true}
                textStyle={{ textAlign: 'center' }}
                title={`Finished`}
                onPress={() => {
                  this.props.setBudget({
                    ...this.props.budget,
                    foodAndDrink: this.state.categories[0].percentage,
                    travel: this.state.categories[1].percentage,
                    recreation: this.state.categories[2].percentage,
                    healthcare: this.state.categories[3].percentage,
                    service: this.state.categories[4].percentage,
                    community: this.state.categories[5].percentage,
                    shops: this.state.categories[6].percentage
                  });
                  this.props.navigation.navigate('Budget', { title: 'Budget' });
                }}
              >
                Finished
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    budget: state.budget,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchBudget: userId => dispatch(fetchBudget(userId)),
    setBudget: budget => dispatch(setBudget(budget)),
  };
};


export default connect(mapState,mapDispatch)(EditCategories);