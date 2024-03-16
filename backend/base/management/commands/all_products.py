import os
import json
from datetime import datetime
from django.core.management.base import BaseCommand
from base.models import Product, Seller, Category, DeliverySlot
import uuid

class Command(BaseCommand):
    help = 'Import data from a JSON file into the database'

    def handle(self, *args, **kwargs):
        json_file_path = os.path.join('base', 'data', 'products.json')

        with open(json_file_path, 'r') as file:
            data = json.load(file)

        for item in data:
            seller_data = item.get('seller')
            category_data = item.get('categoryTag')
            
            earliest_delivery_slot_data = item.get('earliestDeliverySlot')

            if seller_data:
                seller, _ = Seller.objects.get_or_create(
                    id=seller_data.get('id'),
                    storeName=seller_data.get('storeName'),
                    profileImage=seller_data.get('profileImage')
                )

            
            category = None
            if category_data:
                if isinstance(category_data, dict):
                    category, _ = Category.objects.get_or_create(
                        id=str(uuid.uuid4()),
                        name=category_data.get('categoryTag'),
                        image=category_data.get('image'),
                    )
                elif isinstance(category_data, str):
                    category, _ = Category.objects.get_or_create(
                        name=category_data
                    )
            if earliest_delivery_slot_data:
                end_datetime_str = earliest_delivery_slot_data.get('endDatetime')
                if end_datetime_str:
                    end_datetime = datetime.strptime(end_datetime_str, '%Y-%m-%dT%H:%M:%S%z')
                else:
                    end_datetime = None

                earliest_delivery_slot, _ = DeliverySlot.objects.get_or_create(
                    id=earliest_delivery_slot_data.get('id'),
                    date=earliest_delivery_slot_data.get('date'),
                    startDatetime=earliest_delivery_slot_data.get('startDatetime'),
                    duration=earliest_delivery_slot_data.get('duration'),
                    endDatetime=end_datetime,
                    finalizationDatetime=earliest_delivery_slot_data.get('finalizationDatetime'),
                    leadTimeRequired=earliest_delivery_slot_data.get('leadTimeRequired'),
                    isPodAllowed=earliest_delivery_slot_data.get('isPodAllowed')
                )

            product = Product.objects.create(
                name=item.get('name'),
                description=item.get('description'),
                seller=seller if seller_data else None,
                isNPI=item.get('isNPI'),
                detailImage=item.get('detailImage'),
                testReportImage=item.get('testReportImage'),
                testReportDocument=item.get('testReportDocument'),
                price=item.get('price'),
                measurementUnit=item.get('measurementUnit'),
                packageSize=item.get('packageSize'),
                ingredients=item.get('ingredients'),
                storage=item.get('storage'),
                usage=item.get('usage'),
                rating=item.get('rating'),
                numReviews=item.get('numReviews'),
                categoryTag=item.get('categoryTag'),
                cuisineTag=item.get('cuisineTag'),
                specialityTag=item.get('specialityTag'),
                quantityAvailable=item.get('quantityAvailable'),
                showStock=item.get('showStock'),
                isStockInHand=item.get('isStockInHand'),
                vegIndicator=item.get('vegIndicator'),
                earliestDeliverySlot=earliest_delivery_slot if earliest_delivery_slot_data else None,
                category=category if category_data else None
            )

            self.stdout.write(self.style.SUCCESS(f"Product created: {product}"))
