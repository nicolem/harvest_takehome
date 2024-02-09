class Api::V1::UsersController < ApplicationController
  def index
    uri = URI("https://api.harvestapp.com/v2/users")

    Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
      request = Net::HTTP::Get.new uri
      request["User-Agent"] = "Ruby Harvest API Sample"
      request["Authorization"] = "Bearer #{ENV["HARVEST_ACCESS_TOKEN"]}"
      request["Harvest-Account-ID"] = ENV["HARVEST_ACCOUNT_ID"]

      response = http.request request
      json_response = JSON.parse(response.body)["users"].map{|t|
        {
          'user_id': t['id'],
          'first_name': t['first_name'],
          'last_name': t['last_name']
        }
      }

      render json: json_response
    end
  end
end
