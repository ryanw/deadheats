class CreateLanes < ActiveRecord::Migration[8.0]
  def change
    create_table :lanes do |t|
      t.references :race, null: false, foreign_key: true
      t.references :competitor, null: true, foreign_key: true
      t.integer :sort, null: false
      t.string :name

      t.timestamps
    end

    add_index :lanes, [:race_id, :sort], unique: true
  end
end
