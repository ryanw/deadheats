FactoryBot.define do
  factory :london_marathon, class: "Race" do
    name { "London Marathon" }
    lanes_attributes {
      [
        { name: "Lane A", sort: 0, competitor_attributes: { name: "Person 1" } },
        { name: "Lane B", sort: 1, competitor_attributes: { name: "Person 2" } },
        { name: "Lane C", sort: 2, competitor_attributes: { name: "Person 3" } },
        { name: "Lane C", sort: 3, competitor_attributes: { name: "Person 4" } },
        { name: "Lane D", sort: 4, competitor_attributes: { name: "Person 5" } },
        { name: "Lane E", sort: 5, competitor_attributes: { name: "Person 6" } },
        { name: "Lane F", sort: 6, competitor_attributes: { name: "Person 7" } },
        { name: "Lane G", sort: 7, competitor_attributes: { name: "Person 8" } },
        { name: "Lane H", sort: 8, competitor_attributes: { name: "Person 9" } },
        { name: "Lane I", sort: 9, competitor_attributes: { name: "Person 10" } },
      ]
    }
  end

  factory :boston_marathon, class: "Race" do
    name { "Boston Marathon" }
    lanes_attributes {
      [
        { name: "Lane A", sort: 0, competitor_attributes: { name: "Person 1" } },
        { name: "Lane B", sort: 1, competitor_attributes: { name: "Person 2" } },
        { name: "Lane C", sort: 2, competitor_attributes: { name: "Person 3" } },
        { name: "Lane C", sort: 3, competitor_attributes: { name: "Person 4" } },
        { name: "Lane D", sort: 4, competitor_attributes: { name: "Person 5" } },
        { name: "Lane E", sort: 5, competitor_attributes: { name: "Person 6" } },
        { name: "Lane F", sort: 6, competitor_attributes: { name: "Person 7" } },
      ]
    }
  end

  factory :berlin_marathon, class: "Race" do
    name { "Berlin Marathon" }
    lanes_attributes {
      [
        { name: "Lane A", sort: 0, competitor_attributes: { name: "Person 1" } },
        { name: "Lane B", sort: 1, competitor_attributes: { name: "Person 2" } },
        { name: "Lane C", sort: 2, competitor_attributes: { name: "Person 3" } },
      ]
    }
  end
end
