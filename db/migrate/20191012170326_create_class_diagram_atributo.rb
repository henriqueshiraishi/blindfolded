class CreateClassDiagramAtributo < ActiveRecord::Migration[5.1]
  def change
    create_table :class_diagram_atributo do |t|
      t.references :class_diagram_classe, foreign_key: true
      t.string :descricao

      t.timestamps
    end
  end
end
