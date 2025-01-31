class CreateCompetitors < ActiveRecord::Migration[8.0]
  def change
    create_table :competitors do |t|
      t.references :lane, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
