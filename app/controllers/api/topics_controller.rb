class Api::TopicsController < ApplicationController
  before_action :set_topic, only: [:show, :update, :destroy]

  def index
    render json: Topic.all
  end

  def show
    render json: @topic
  end

  def create
    @topic = Topic.new(topic_params)
    if @topic.save
      render json: @topic
    else
      render json: @topic.errors, status: 422
    end
  end

  def update
    if @topic.update(topic_params)
      render json: @topic
    else
      render json: @topic.errors, status: 422
    end
  end

  def destroy
    render json: @topic.destroy
  end

  private

  def set_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.require(:topic).permit(:topic_name)
  end
end
