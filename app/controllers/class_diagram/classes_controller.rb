class ClassDiagram::ClassesController < ApplicationController
  before_action :set_classe, only: [:edit, :update, :destroy]
  before_action :set_diagrama, only: [:new, :edit]

  def new
    @classe = Classe.new
    params_for_atributo
    params_for_metodo
    params_for_associacao
    @title = 'Nova Classe'
  end

  def edit
    params_for_atributo
    params_for_metodo
    params_for_associacao
    @title = 'Editando Classe'
  end

  def create
    respond_to do |format|
      begin
        @classe = Classe.new(classe_params)
        if @classe.save
          flash[:notice] = 'Classe criada com sucesso.'
          format.html { redirect_to edit_class_diagram_classes_path(@classe, diagrama_id: params[:classe][:diagrama_id]) }
        end
        if @classe.errors.any?
          flash[:alert] = catch(@classe)
          @params_for_reload = classe_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = classe_params
      end
      format.html { redirect_to new_class_diagram_classes_path(params: @params_for_reload) }
    end
  end

  def update
    respond_to do |format|
      begin
        flash[:notice] = 'Classe atualizada com sucesso.' if @classe.update(classe_params)
        if @classe.errors.any?
          flash[:alert] = catch(@classe)
          @params_for_reload = classe_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = classe_params
      end
      format.html { redirect_to edit_class_diagram_classes_path(@classe, params: @params_for_reload, diagrama_id: params[:classe][:diagrama_id]) }
    end
  end

  def destroy
    respond_to do |format|
      begin
        flash[:notice] = 'Classe removida com sucesso.' if @classe.destroy
        flash[:alert] = catch(@classe) if @classe.errors.any?
      rescue StandardError => e
        flash[:error] = e.message
      end
      format.html { redirect_to edit_class_diagram_diagramas_path(@classe.diagrama_id) }
    end
  end

  private
    def set_classe
      @classe = Classe.find(params[:id])
    end

    def set_diagrama
      @diagrama = Diagrama.find(params[:diagrama_id])
    end

    def classe_params
      @params_for_reload = {}
      params.require(:classe).permit(:diagrama_id, :nome, :estereotipo, atributo_attributes: [:id, :descricao, :_destroy], metodo_attributes: [:id, :descricao, :_destroy], associacao_attributes: [:id, :classe_id, :classe_destino, :tipo_associacao, :multi_a, :multi_b, :estereotipo, :_destroy])
    end

    def params_for_atributo
      if @items = params[:atributo_attributes]
        @items.each do |i|
          @item = Atributo.new(descricao: @items[i]['descricao'])
          @classe.atributo.new(@item.attributes) if @items[i]['id'].blank?
        end
        return true
      end
      return false
    end

    def params_for_metodo
      if @items = params[:metodo_attributes]
        @items.each do |i|
          @item = Metodo.new(descricao: @items[i]['descricao'])
          @classe.metodo.new(@item.attributes) if @items[i]['id'].blank?
        end
        return true
      end
      return false
    end

    def params_for_associacao
      if @items = params[:associacao_attributes]
        @items.each do |i|
          @item = Associacao.new(
            classe_id: @items[i]['classe_id'],
            classe_destino: @items[i]['classe_destino'],
            tipo_associacao: @items[i]['tipo_associacao'],
            multi_a: @items[i]['multi_a'],
            multi_b: @items[i]['multi_b'],
            estereotipo: @items[i]['estereotipo']
          )
          @classe.associacao.new(@item.attributes) if @items[i]['id'].blank?
        end
        return true
      end
      return false
    end
end
