class ClassDiagram::ClassesController < ApplicationController
  before_action :set_classe, only: [:edit, :update, :destroy]
  before_action :set_diagrama, only: [:new, :edit]

  def new
    @classe = CLCLAS.new
    params_for_clatri
    params_for_clmeto
    @title = 'Nova Classe'
  end

  def edit
    params_for_clatri
    params_for_clmeto
    @title = 'Editando Classe'
  end

  def create
    respond_to do |format|
      begin
        @classe = CLCLAS.new(classe_params)
        if @classe.save
          flash[:notice] = 'Classe criada com sucesso.'
          format.html { redirect_to edit_class_diagram_classes_path(@classe, cldiag_id: params[:clclas][:cldiag_id]) }
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
      format.html { redirect_to edit_class_diagram_classes_path(@classe, params: @params_for_reload, cldiag_id: params[:clclas][:cldiag_id]) }
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
      format.html { redirect_to edit_class_diagram_diagramas_path(@classe.cldiag_id) }
    end
  end

  private
    def set_classe
      @classe = CLCLAS.find(params[:id])
    end

    def set_diagrama
      @diagrama = CLDIAG.find(params[:cldiag_id])
    end

    def classe_params
      @params_for_reload = {}
      params.require(:clclas).permit(:cldiag_id, :nome, :estereotipo, clatri_attributes: [:id, :descricao, :_destroy], clmeto_attributes: [:id, :descricao, :_destroy])
    end

    def params_for_clatri
      if @items = params[:clatri_attributes]
        @items.each do |i|
          @item = CLATRI.new(descricao: @items[i]['descricao'])
          @classe.clatri.new(@item.attributes) if @items[i]['id'].blank?
        end
        return true
      end
      return false
    end

    def params_for_clmeto
      if @items = params[:clmeto_attributes]
        @items.each do |i|
          @item = CLMETO.new(descricao: @items[i]['descricao'])
          @classe.clmeto.new(@item.attributes) if @items[i]['id'].blank?
        end
        return true
      end
      return false
    end
end
