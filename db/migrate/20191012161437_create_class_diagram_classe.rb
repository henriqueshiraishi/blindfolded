class CreateClassDiagramClasse < ActiveRecord::Migration[5.1]
  def change
    create_table :class_diagram_classe do |t|
      t.references :class_diagram_diagrama, foreign_key: true
      t.string :nome
      t.string :estereotipo

      t.timestamps
    end
  end
end
