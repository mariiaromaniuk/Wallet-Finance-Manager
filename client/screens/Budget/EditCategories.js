import React, { Component } from "react";
import { View, Text, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchBudget, setBudget } from '../../store/budget';
import Slider from 'react-native-slider';
import { styles } from '../../styles';


class EditCategories extends Component {
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
      console.log("PROPS", props)
      console.log("STATE", state)
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
    const userId = this.props.user.id
    return (
      <ScrollView>
        <View>
          {this.props.budget.id && (
            <View>
              <View>
                <Text style={styles.headerText}>
                  Edit Your Budget
                </Text>
                <View style={[styles.introInfo, { paddingTop: 10 }]}>
                  <Text style={styles.headerText}>
                    {this.state.remaining}%
                  </Text>
                  <Text style={styles.headerText}>
                    ${(this.props.budget.spendingBudget *
                      this.state.remaining) /
                      100}
                  </Text>
                </View>

                <View style={[styles.introInfo, { paddingBottom: 10 }]}>
                  <Text style={styles.smallerText}>
                    remaining
                  </Text>
                  <Text style={styles.smallerText}>
                    of ${this.props.budget.spendingBudget}
                  </Text>
                </View>
              </View>
              <View style={{ paddingLeft: 5, paddingRight: 5 }} />

              {/* All Categories */}
              {this.state.categories &&
                this.state.categories.map(category => {
                  return (
                    <Card key={category.name} containerStyle={{ margin: 19, borderRadius: 6 }}>
                      <View>
                        <View style={{ padding: 5, width: '100%' }} />
                        <View
                          style={{
                            paddingLeft: 20,
                            paddingEnd: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Text style={styles.categoryText}>
                            {this.toTitle(category.name)}
                          </Text>

                          <Text style={styles.categoryText}>
                            {category.percentage}%
                          </Text>
                        </View>

                        <Slider
                            trackStyle={styles.track}
                            thumbStyle={styles.thumb}
                            minimumTrackTintColor="#D16C58"
                            maximumTrackTintColor="#b7b7b7"
                            style={styles.slider}
                            value={category.percentage}
                            onSlidingComplete={value => {
                                const remainingNew =
                                  this.state.remaining +
                                  (category.percentage - value);
                                this.state.categories = [...this.state.categories].map(
                                    elem => {
                                      if (elem.name === category.name) {
                                        elem.percentage = value;
                                        return elem;
                                      } else {
                                        return elem;
                                      }
                                    })
                                  this.state.remaining = remainingNew;

                              console.log("STATE REMINING", this.state.remaining)
                              console.log("STATE CATEGORIES", this.state.categories)
                            }}
                            step={5}
                            minimumValue={0}
                            maximumValue={100}
                        />
                      </View>
                    </Card>
                  );
                })}

              {/* Button */}
              <Button
                raised
                // disabled={this.state.remaining >= 0 ? false : true}
                type="outline"
                block style={{ margin: 100, marginTop: 40 }} 
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
                  }, userId);
                  console.log("categories", this.state.categories[0].percentage)
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
    setBudget: (budget, userId) => dispatch(setBudget(budget, userId)),
  };
};

export default connect(mapState,mapDispatch)(EditCategories);
