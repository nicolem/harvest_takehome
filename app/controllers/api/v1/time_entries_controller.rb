class Api::V1::TimeEntriesController < ApplicationController
  def index
    uri = URI("https://api.harvestapp.com/v2/time_entries?from=2024-02-01&to=2024-03-01")

    Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
      request = Net::HTTP::Get.new uri
      request["User-Agent"] = "Ruby Harvest API Sample"
      request["Authorization"] = "Bearer #{ENV["HARVEST_ACCESS_TOKEN"]}"
      request["Harvest-Account-ID"] = ENV["HARVEST_ACCOUNT_ID"]

      response = http.request request
      json_response = JSON.parse(response.body)["time_entries"].map{|t|
        {
          "user_name": t.dig('user', 'name'),
          "client_name": t.dig('client', 'name'),
          "project_name": t.dig('project', 'name'),
          "task": t.dig('task', 'name'),
          "notes": t['notes'],
          "time_date": t['spent_date'],
          "time_hours": t['hours']
        }
      }

      render json: json_response
    end
  end
end
