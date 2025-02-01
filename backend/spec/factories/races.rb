FactoryBot.define do
  factory :london_marathon, class: "Race" do
    name { "London Marathon" }
    lanes_attributes {
      [
        { name: "Lane A", sort: 0 },
        { name: "Lane B", sort: 1 },
        { name: "Lane C", sort: 2 },
        { name: "Lane C", sort: 3 },
        { name: "Lane D", sort: 4 },
        { name: "Lane E", sort: 5 },
        { name: "Lane F", sort: 6 },
        { name: "Lane G", sort: 7 },
        { name: "Lane H", sort: 8 },
        { name: "Lane I", sort: 9 },
      ]
    }
  end

  factory :boston_marathon, class: "Race" do
    name { "Boston Marathon" }
    lanes_attributes {
      [
        { name: "Lane A", sort: 0 },
        { name: "Lane B", sort: 1 },
        { name: "Lane C", sort: 2 },
        { name: "Lane C", sort: 3 },
        { name: "Lane D", sort: 4 },
        { name: "Lane E", sort: 5 },
        { name: "Lane F", sort: 6 },
      ]
    }
  end

  factory :berlin_marathon, class: "Race" do
    name { "Berlin Marathon" }
    lanes_attributes {
      [
        { name: "Lane A", sort: 0 },
        { name: "Lane B", sort: 1 },
        { name: "Lane C", sort: 2 },
        { name: "Lane C", sort: 3 },
      ]
    }
  end
end
